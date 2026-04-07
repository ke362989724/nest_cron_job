export const MARKET_DATA_QUEUE = 'market-data-queue';
export const FETCH_MARKET_DATA_JOB = 'fetch-market-data-job';

export interface FetchMarketDataJobPayload {
  symbol: string;
  requestedAt: string;
}
