import { NextResponse } from "next/server";
import { secApiClient } from "@/lib/sec-api/client";
import { cache, CACHE_TTL } from "@/lib/sec-api/cache";
import { Fund } from "@/types/fund";
import { getMockFundList } from "@/lib/sec-api/mock-data";

interface SecFundResponse {
  last_upd_date: string;
  data: Array<{
    proj_id: string;
    proj_abbr_name: string;
    proj_name_th: string;
    proj_name_en: string;
    regis_date: string;
    cancel_date: string | null;
    management_company: string;
    fund_type: string;
    nav_per_unit: number;
    nav_date: string;
  }>;
}

export async function GET() {
  try {
    const cacheKey = "funds:list";
    const cached = cache.get<Fund[]>(cacheKey);

    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const response = await secApiClient.get<SecFundResponse>("/fund/aum");

    if (!response || !response.data) {
      throw new Error("Invalid response from SEC API");
    }

    const funds: Fund[] = response.data
      .filter((fund) => !fund.cancel_date)
      .map((fund) => ({
        fundCode: fund.proj_abbr_name,
        fundName: fund.proj_name_th || fund.proj_name_en,
        navPerUnit: fund.nav_per_unit,
        navDate: fund.nav_date,
        category: fund.fund_type,
        managementCompany: fund.management_company,
      }));

    cache.set(cacheKey, funds, CACHE_TTL.SEC_API);

    return NextResponse.json({ data: funds, cached: false });
  } catch (error) {
    console.error("Error fetching fund list from SEC API:", error);
    console.log("Falling back to mock data");
    
    const mockFunds = getMockFundList();
    cache.set("funds:list", mockFunds, 300);
    
    return NextResponse.json({ 
      data: mockFunds, 
      cached: false,
      mock: true,
      note: "Using mock data - SEC API unavailable"
    });
  }
}
