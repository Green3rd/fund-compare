import { NextResponse } from "next/server";
import { yahooFinanceClient } from "@/lib/yahoo-finance/client";
import { cache, CACHE_TTL } from "@/lib/sec-api/cache";
import { YahooFinanceData } from "@/types/fund";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const { ticker } = await params;
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const start = startDate ? new Date(startDate) : new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    const cacheKey = `yahoo:history:${ticker}:${start.toISOString()}:${end.toISOString()}`;
    const cached = cache.get<YahooFinanceData>(cacheKey);

    if (cached) {
      return NextResponse.json({ data: cached, cached: true });
    }

    const response = await yahooFinanceClient.getHistoricalData(ticker, start, end);

    if (!response.chart || !response.chart.result || response.chart.result.length === 0) {
      return NextResponse.json(
        { error: "No data available from Yahoo Finance", fallback: true },
        { status: 404 }
      );
    }

    const result = response.chart.result[0];
    const timestamps = result.timestamp || [];
    const quotes = result.indicators?.quote?.[0] || {};
    const closes = quotes.close || [];

    const data: YahooFinanceData = {
      ticker,
      data: timestamps.map((timestamp: number, index: number) => {
        const price = closes[index];
        const prevPrice = index > 0 ? closes[index - 1] : price;
        const change = prevPrice ? ((price - prevPrice) / prevPrice) * 100 : 0;

        return {
          date: new Date(timestamp * 1000).toISOString().split("T")[0],
          price: price || 0,
          change: change || 0,
        };
      }).filter((item: { date: string; price: number; change: number }) => item.price > 0),
    };

    cache.set(cacheKey, data, CACHE_TTL.YAHOO);

    return NextResponse.json({ data, cached: false });
  } catch (error) {
    console.error("Error fetching Yahoo Finance data:", error);
    return NextResponse.json(
      { error: "Failed to fetch Yahoo Finance data", fallback: true },
      { status: 500 }
    );
  }
}
