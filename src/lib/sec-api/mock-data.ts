import { Fund } from "@/types/fund";

export const mockFunds: Fund[] = [
  {
    fundCode: "K-CHINA",
    fundName: "กองทุนเปิดกรุงศรีจีน",
    navPerUnit: 45.23,
    navDate: "2024-05-19",
    category: "ตราสารทุน",
    managementCompany: "บลจ.กรุงศรี",
  },
  {
    fundCode: "SCBSET50",
    fundName: "กองทุนเปิดไทยพาณิชย์ SET50 อินเด็กซ์ฟันด์",
    navPerUnit: 125.67,
    navDate: "2024-05-19",
    category: "ตราสารทุน",
    managementCompany: "บลจ.ไทยพาณิชย์",
  },
  {
    fundCode: "KFGBRAND",
    fundName: "กองทุนเปิดกรุงศรีโกลบอลแบรนด์",
    navPerUnit: 78.91,
    navDate: "2024-05-19",
    category: "ตราสารทุน",
    managementCompany: "บลจ.กรุงศรี",
  },
  {
    fundCode: "TMBGQG",
    fundName: "กองทุนเปิดทหารไทยโกลบอลควอลิตี้โกรท",
    navPerUnit: 56.34,
    navDate: "2024-05-19",
    category: "ตราสารทุน",
    managementCompany: "บลจ.ทหารไทย",
  },
  {
    fundCode: "SCBSET",
    fundName: "กองทุนเปิดไทยพาณิชย์ SET อินเด็กซ์ฟันด์",
    navPerUnit: 98.45,
    navDate: "2024-05-19",
    category: "ตราสารทุน",
    managementCompany: "บลจ.ไทยพาณิชย์",
  },
];

export function getMockFundList(): Fund[] {
  return mockFunds;
}

export function getMockFundByCode(code: string): Fund | null {
  return mockFunds.find((f) => f.fundCode === code) || null;
}
