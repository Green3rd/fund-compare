export interface YahooFinanceConfig {
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

const defaultConfig: YahooFinanceConfig = {
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  config: YahooFinanceConfig = defaultConfig
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < config.retryAttempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        const delay = config.retryDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error as Error;

      if (attempt < config.retryAttempts - 1) {
        const delay = config.retryDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Failed to fetch after retries");
}

export class YahooFinanceClient {
  private config: YahooFinanceConfig;

  constructor(config: Partial<YahooFinanceConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async getHistoricalData(
    ticker: string,
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    const period1 = Math.floor(startDate.getTime() / 1000);
    const period2 = Math.floor(endDate.getTime() / 1000);

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?period1=${period1}&period2=${period2}&interval=1d`;

    const response = await fetchWithRetry(url, {}, this.config);
    return response.json();
  }
}

export const yahooFinanceClient = new YahooFinanceClient();
