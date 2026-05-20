import { HistoricalData } from "@/types/fund";

function generateMockHistoricalData(fundCode: string, baseNav: number, days: number = 400): HistoricalData {
  const data = [];
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * 2;
    const nav = baseNav * (1 + (Math.random() - 0.5) * 0.1);
    
    data.push({
      date: date.toISOString().split("T")[0],
      nav: parseFloat(nav.toFixed(2)),
      change: parseFloat(randomChange.toFixed(2)),
    });
  }
  
  return {
    fundCode,
    data,
  };
}

export function getMockHistoricalData(fundCode: string): HistoricalData | null {
  const baseNavs: Record<string, number> = {
    "K-CHINA": 45.23,
    "SCBSET50": 125.67,
    "KFGBRAND": 78.91,
    "TMBGQG": 56.34,
    "SCBSET": 98.45,
  };
  
  const baseNav = baseNavs[fundCode];
  if (!baseNav) return null;
  
  return generateMockHistoricalData(fundCode, baseNav);
}
