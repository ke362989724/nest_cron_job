import {
  RealTimePriceProps,
  RealTimePriceResponseProps,
} from '../types/realTime';

type RequestParams = Record<string, string | number | boolean | undefined>;

const BASE_URL = process.env.FMP_BASE_URL;
const API_KEY = process.env.FMP_API_KEY;
const MAX_RETRIES = 30;
const RETRY_DELAY_MS = 3_000;

function buildUrl(path: string, params?: RequestParams): string {
  if (!BASE_URL) {
    throw new Error('FMP_BASE_URL is not configured.');
  }

  const url = new URL(path, BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`);
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params ?? {})) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  if (API_KEY) {
    searchParams.set('apikey', API_KEY);
  }

  url.search = searchParams.toString();
  return url.toString();
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function get<TResponse>(
  path: string,
  params?: RequestParams,
): Promise<TResponse> {
  const url = buildUrl(path, params);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status >= 500 && attempt < MAX_RETRIES) {
          await delay((attempt + 1) * RETRY_DELAY_MS);
          continue;
        }

        throw new Error(
          `FMP request failed: ${response.status} ${response.statusText}`,
        );
      }

      return (await response.json()) as TResponse;
    } catch (error) {
      if (attempt >= MAX_RETRIES) {
        throw error instanceof Error ? error : new Error(String(error));
      }

      await delay((attempt + 1) * RETRY_DELAY_MS);
    }
  }

  throw new Error('FMP request retry loop exited unexpectedly.');
}

export interface StockDailyPriceAPIProps {
  symbol: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

export interface AvailableCountryProps {
  name: string;
  code: string;
}

export interface AvailableIndustryProps {
  industry: string;
}

export interface AvailableSectorProps {
  sector: string;
}

export interface StockSymbolSearchProps {
  symbol: string;
  name?: string;
  exchangeShortName?: string;
  exchange?: string;
}

export interface StockListItemProps {
  symbol: string;
  name?: string;
  price?: number;
  exchange?: string;
}

export interface BalanceSheetAPIResponseProps {
  [key: string]: unknown;
}

export interface StockScreenerItemProps {
  [key: string]: unknown;
}

export type IncomeStatementAPIResponseProps = {
  symbol: string;
  date: Date;
  reportedCurrency: string;
  cik: string;
  filingDate: Date;
  acceptedDate: Date;
  fiscalYear: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  researchAndDevelopmentExpenses: number;
  generalAndAdministrativeExpenses: number;
  sellingAndMarketingExpenses: number;
  sellingGeneralAndAdministrativeExpenses: number;
  otherExpenses: number;
  operatingExpenses: number;
  costAndExpenses: number;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  depreciationAndAmortization: number;
  ebitda: number;
  ebit: number;
  nonOperatingIncomeExcludingInterest: number;
  operatingIncome: number;
  totalOtherIncomeExpensesNet: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  netIncomeFromContinuingOperations: number;
  netIncomeFromDiscontinuedOperations: number;
  otherAdjustmentsToNetIncome: number;
  netIncome: number;
  netIncomeDeductions: number;
  bottomLineNetIncome: number;
  eps: number;
  epsDiluted: number;
  weightedAverageShsOut: number;
  weightedAverageShsOutDil: number;
};

interface IndexPriceProps {
  symbol: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  vwap: number;
}

type StockCandleProps = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export const stockSymbolAPI = ({
  query,
  limit,
  exchange,
}: {
  query?: string;
  limit?: number;
  exchange?: string;
}): Promise<StockSymbolSearchProps[]> => {
  return get<StockSymbolSearchProps[]>('stable/search-symbol', {
    query,
    limit,
    exchange,
  });
};

export const stockScreenerAPI = ({
  marketCapMoreThan,
  marketCapLowerThan,
  sector,
  industry,
  betaMoreThan,
  betaLowerThan,
  priceMoreThan,
  priceLowerThan,
  dividendMoreThan,
  dividendLowerThan,
  volumeMoreThan,
  volumeLowerThan,
  exchange,
  country,
  isEtf,
  isFund,
  isActivelyTrading,
  includeAllShareClasses,
  limit,
}: {
  marketCapMoreThan?: number;
  marketCapLowerThan?: number;
  sector?: string;
  industry?: string;
  betaMoreThan?: number;
  betaLowerThan?: number;
  priceMoreThan?: number;
  priceLowerThan?: number;
  dividendMoreThan?: number;
  dividendLowerThan?: number;
  volumeMoreThan?: number;
  volumeLowerThan?: number;
  exchange?: string;
  country?: string;
  isEtf?: boolean;
  isFund?: boolean;
  isActivelyTrading?: boolean;
  includeAllShareClasses?: boolean;
  limit?: number;
}): Promise<StockScreenerItemProps[]> => {
  return get<StockScreenerItemProps[]>('stable/company-screener', {
    marketCapMoreThan,
    marketCapLowerThan,
    sector,
    industry,
    betaMoreThan,
    betaLowerThan,
    priceMoreThan,
    priceLowerThan,
    dividendMoreThan,
    dividendLowerThan,
    volumeMoreThan,
    volumeLowerThan,
    exchange,
    country,
    isEtf,
    isFund,
    isActivelyTrading,
    includeAllShareClasses,
    limit,
  });
};

export const stockListAPI = (): Promise<StockListItemProps[]> => {
  return get<StockListItemProps[]>('api/v3/stock/list');
};

export const stockDailyPriceAPI = ({
  ticker,
  from,
  to,
}: {
  ticker: string;
  from?: string;
  to?: string;
}): Promise<StockDailyPriceAPIProps[]> => {
  return get<StockDailyPriceAPIProps[]>('stable/historical-price-eod/full', {
    symbol: ticker,
    from,
    to,
  });
};

export const incomeStatementAPI = ({
  symbol,
  limit,
  period,
}: {
  symbol: string;
  limit?: number;
  period?: string;
}): Promise<IncomeStatementAPIResponseProps[]> => {
  return get<IncomeStatementAPIResponseProps[]>('stable/income-statement', {
    symbol,
    limit,
    period,
  });
};

export const balanceSheetAPI = ({
  symbol,
  limit,
  period,
}: {
  symbol: string;
  limit?: number;
  period?: string;
}): Promise<BalanceSheetAPIResponseProps[]> => {
  return get<BalanceSheetAPIResponseProps[]>('stable/balance-sheet-statement', {
    symbol,
    limit,
    period,
  });
};

export const availableCountriesAPI = (): Promise<AvailableCountryProps[]> => {
  return get<AvailableCountryProps[]>('stable/available-countries');
};

export const availableSectorsAPI = (): Promise<AvailableSectorProps[]> => {
  return get<AvailableSectorProps[]>('stable/available-sectors');
};

export const availableIndustriesAPI = (): Promise<AvailableIndustryProps[]> => {
  return get<AvailableIndustryProps[]>('stable/available-industries');
};

export const indexHistoryPriceAPI = ({
  symbol,
}: {
  symbol: string;
}): Promise<IndexPriceProps[]> => {
  return get<IndexPriceProps[]>('stable/historical-price-eod/full', {
    symbol,
  });
};

export function stockChartPriceByHoursMinute({
  interval,
  symbol,
  from,
  to,
}: {
  interval: string;
  symbol: string;
  from?: string;
  to?: string;
}): Promise<StockCandleProps[]> {
  return get<StockCandleProps[]>(`stable/historical-chart/${interval}`, {
    symbol,
    from,
    to,
  });
}

export function realTimePriceAPI({
  symbol,
}: RealTimePriceProps): Promise<RealTimePriceResponseProps[]> {
  return get<RealTimePriceResponseProps[]>('stable/quote', {
    symbol,
  });
}
