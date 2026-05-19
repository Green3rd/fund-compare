const SEC_API_BASE_URL = process.env.SEC_API_BASE_URL || "https://api.sec.or.th/FundDailyInfo";

export interface SecApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

const defaultConfig: SecApiConfig = {
  baseUrl: SEC_API_BASE_URL,
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
};

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  config: SecApiConfig = defaultConfig
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

export class SecApiClient {
  private config: SecApiConfig;

  constructor(config: Partial<SecApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async get<T>(endpoint: string): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const response = await fetchWithRetry(url, {}, this.config);
    return response.json();
  }
}

export const secApiClient = new SecApiClient();
