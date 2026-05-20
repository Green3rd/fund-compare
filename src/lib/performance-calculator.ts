import { HistoricalData, PerformanceMetrics } from "@/types/fund";

interface CalculationCache {
  [key: string]: PerformanceMetrics;
}

const cache: CalculationCache = {};

export function calculatePerformanceMetrics(
  historicalData: HistoricalData
): PerformanceMetrics {
  const cacheKey = `${historicalData.fundCode}:${historicalData.data.length}`;
  
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const data = historicalData.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const latest = data[data.length - 1];
  const now = new Date();

  const metrics: PerformanceMetrics = {
    oneMonthReturn: calculateReturn(data, 30),
    threeMonthReturn: calculateReturn(data, 90),
    sixMonthReturn: calculateReturn(data, 180),
    oneYearReturn: calculateReturn(data, 365),
    ytdReturn: calculateYTDReturn(data, now),
  };

  cache[cacheKey] = metrics;
  return metrics;
}

function calculateReturn(data: Array<{ date: string; nav: number }>, days: number): number | null {
  if (data.length < 2) return null;

  const latest = data[data.length - 1];
  const targetDate = new Date(latest.date);
  targetDate.setDate(targetDate.getDate() - days);

  const startData = data.find((item) => {
    const itemDate = new Date(item.date);
    return itemDate <= targetDate;
  });

  if (!startData || startData.nav === 0) return null;

  return ((latest.nav - startData.nav) / startData.nav) * 100;
}

function calculateYTDReturn(
  data: Array<{ date: string; nav: number }>,
  now: Date
): number | null {
  if (data.length < 2) return null;

  const yearStart = new Date(now.getFullYear(), 0, 1);
  const latest = data[data.length - 1];

  const startData = data.find((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= yearStart;
  });

  if (!startData || startData.nav === 0) return null;

  return ((latest.nav - startData.nav) / startData.nav) * 100;
}

export function clearPerformanceCache(): void {
  Object.keys(cache).forEach((key) => delete cache[key]);
}
