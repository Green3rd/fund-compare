import { NextResponse } from "next/server";
import { secApiClient } from "@/lib/sec-api/client";
import { cache, CACHE_TTL } from "@/lib/sec-api/cache";
import { Fund } from "@/types/fund";
import { getMockFundByCode } from "@/lib/sec-api/mock-data";

interface SecNavResponse {
  data: Array<{
    proj_abbr_name: string;
    proj_name_th: string;
    proj_name_en: string;
    management_company: string;
    fund_type: string;
    nav_per_unit: number;
    nav_date: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  
  try {
    const cacheKey = `fund:nav:${code}`;
    const cached = cache.get<Fund>(cacheKey);

    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const response = await secApiClient.get<SecNavResponse>(
      `/fund/nav?proj_abbr_name=${encodeURIComponent(code)}`
    );

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { error: "Fund not found" },
        { status: 404 }
      );
    }

    const fundData = response.data[0];
    const fund: Fund = {
      fundCode: fundData.proj_abbr_name,
      fundName: fundData.proj_name_th || fundData.proj_name_en,
      navPerUnit: fundData.nav_per_unit,
      navDate: fundData.nav_date,
      category: fundData.fund_type,
      managementCompany: fundData.management_company,
    };

    cache.set(cacheKey, fund, CACHE_TTL.SEC_API);

    return NextResponse.json({ data: fund, cached: false });
  } catch (error) {
    console.error("Error fetching NAV data from SEC API:", error);
    console.log("Falling back to mock data for fund:", code);
    
    const mockFund = getMockFundByCode(code);
    
    if (!mockFund) {
      return NextResponse.json(
        { error: "Fund not found" },
        { status: 404 }
      );
    }
    
    cache.set(`fund:nav:${code}`, mockFund, 300);
    
    return NextResponse.json({ 
      data: mockFund, 
      cached: false,
      mock: true,
      note: "Using mock data - SEC API unavailable"
    });
  }
}
