import { Fund, PerformanceMetrics } from "@/types/fund";

const MOCK_FUNDS: Fund[] = [
  {
    fundCode: "K-CHINA",
    fundName: "กองทุนเปิดกรุงศรีจีน",
    navPerUnit: 45.23,
    navDate: "2025-01-15",
    category: "Equity",
    managementCompany: "Krungthai Asset Management",
    dailyChange: 0.52,
    performanceMetrics: {
      oneMonthReturn: 2.34,
      threeMonthReturn: 5.67,
      sixMonthReturn: 8.91,
      oneYearReturn: 15.23,
      ytdReturn: 3.45,
    },
  },
  {
    fundCode: "SCBSET50",
    fundName: "กองทุนเปิดไทยพาณิชย์ SET50",
    navPerUnit: 125.67,
    navDate: "2025-01-15",
    category: "Index Fund",
    managementCompany: "SCB Asset Management",
    dailyChange: -0.23,
    performanceMetrics: {
      oneMonthReturn: 1.12,
      threeMonthReturn: 3.45,
      sixMonthReturn: 6.78,
      oneYearReturn: 12.34,
      ytdReturn: 2.56,
    },
  },
  {
    fundCode: "KFGBRAND",
    fundName: "กองทุนเปิดกรุงศรีโกลบอลแบรนด์",
    navPerUnit: 78.91,
    navDate: "2025-01-15",
    category: "Global Equity",
    managementCompany: "Krungthai Asset Management",
    dailyChange: 0.89,
    performanceMetrics: {
      oneMonthReturn: 3.45,
      threeMonthReturn: 7.89,
      sixMonthReturn: 12.34,
      oneYearReturn: 18.56,
      ytdReturn: 4.67,
    },
  },
  {
    fundCode: "TMBGQG",
    fundName: "กองทุนเปิดทหารไทยโกลบอลควอลิตี้โกรท",
    navPerUnit: 56.34,
    navDate: "2025-01-15",
    category: "Global Equity",
    managementCompany: "TMB Asset Management",
    dailyChange: -0.15,
    performanceMetrics: {
      oneMonthReturn: -1.23,
      threeMonthReturn: 2.34,
      sixMonthReturn: 5.67,
      oneYearReturn: 10.12,
      ytdReturn: -0.45,
    },
  },
  {
    fundCode: "SCBSET",
    fundName: "กองทุนเปิดไทยพาณิชย์ SET",
    navPerUnit: 98.45,
    navDate: "2025-01-15",
    category: "Index Fund",
    managementCompany: "SCB Asset Management",
    dailyChange: 0.34,
    performanceMetrics: {
      oneMonthReturn: 1.89,
      threeMonthReturn: 4.56,
      sixMonthReturn: 7.89,
      oneYearReturn: 14.23,
      ytdReturn: 2.78,
    },
  },
];

export function getMockFundList(): Fund[] {
  return MOCK_FUNDS;
}

export function getMockFundByCode(code: string): Fund | null {
  return MOCK_FUNDS.find((fund) => fund.fundCode === code) || null;
}
