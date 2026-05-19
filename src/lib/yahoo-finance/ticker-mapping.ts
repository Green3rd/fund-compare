export const fundToTickerMapping: Record<string, string> = {
  "K-CHINA": "K-CHINA.BK",
  "KFGBRAND": "KFGBRAND.BK",
  "SCBSET50": "SCBSET50.BK",
  "SCBSET": "SCBSET.BK",
  "TMBGQG": "TMBGQG.BK",
  "TMBGQG-A": "TMBGQG-A.BK",
};

export function getFundTicker(fundCode: string): string | null {
  if (fundToTickerMapping[fundCode]) {
    return fundToTickerMapping[fundCode];
  }

  const standardTicker = `${fundCode}.BK`;
  return standardTicker;
}

export function isTickerAvailable(fundCode: string): boolean {
  return fundCode in fundToTickerMapping;
}

export function addTickerMapping(fundCode: string, ticker: string): void {
  fundToTickerMapping[fundCode] = ticker;
}
