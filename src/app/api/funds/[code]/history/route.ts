import { NextResponse } from "next/server";
import { secApiClient } from "@/lib/sec-api/client";
import { cache, CACHE_TTL } from "@/lib/sec-api/cache";
import { HistoricalData } from "@/types/fund";
import { getMockHistoricalData } from "@/lib/sec-api/mock-historical-data";

interface SecHistoricalResponse {
  data: Array<{
    nav_date: string;
    nav_per_unit: number;
    change: number;
  }>;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  
  try {

    const cacheKey = `fund:history:${code}:${startDate}:${endDate}`;
    const cached = cache.get<HistoricalData>(cacheKey);

    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    let endpoint = `/fund/nav/daily?proj_abbr_name=${encodeURIComponent(code)}`;
    if (startDate) {
      endpoint += `&start_date=${startDate}`;
    }
    if (endDate) {
      endpoint += `&end_date=${endDate}`;
    }

    const response = await secApiClient.get<SecHistoricalResponse>(endpoint);

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "No historical data found" },
        { status: 404 }
      );
    }

    const historicalData: HistoricalData = {
      fundCode: code,
      data: response.data.map((item) => ({
        date: item.nav_date,
        nav: item.nav_per_unit,
        change: item.change || 0,
      })),
    };

    cache.set(cacheKey, historicalData, CACHE_TTL.SEC_API);

    return NextResponse.json({ data: historicalData, cached: false });
  } catch (error) {
    console.error("Error fetching historical data from SEC API:", error);
    console.log("Falling back to mock historical data for fund:", code);
    
    const mockData = getMockHistoricalData(code);
    
    if (!mockData) {
      return NextResponse.json(
        { error: "No historical data found" },
        { status: 404 }
      );
    }
    
    cache.set(`fund:history:${code}:${startDate}:${endDate}`, mockData, 300);
    
    return NextResponse.json({ 
      data: mockData, 
      cached: false,
      mock: true,
      note: "Using mock data - SEC API unavailable"
    });
  }
}
