export interface PerformanceMetrics {
  oneMonthReturn: number | null;
  threeMonthReturn: number | null;
  sixMonthReturn: number | null;
  oneYearReturn: number | null;
  ytdReturn: number | null;
}

export interface Fund {
  fundCode: string;
  fundName: string;
  navPerUnit: number;
  navDate: string;
  category: string;
  managementCompany: string;
  dailyChange?: number | null;
  performanceMetrics?: PerformanceMetrics;
}

export interface HistoricalData {
  fundCode: string;
  data: Array<{
    date: string;
    nav: number;
    change: number;
  }>;
}

export interface YahooFinanceData {
  ticker: string;
  data: Array<{
    date: string;
    price: number;
    change: number;
  }>;
}
