import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import {
  AvailableSectorProps,
  IncomeStatementApiResponseProps,
  IndexPriceProps,
  RealTimePriceProps,
  RealTimePriceResponseProps,
  StockCandleProps,
  StockDailyPriceApiProps,
} from '../types/fmp.types';

@Injectable()
export class FmpApiService {
  constructor(private readonly httpService: HttpService) {}

  private get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return this.httpService.axiosRef.get<T, T>(url, { params });
  }

  stockSymbolAPI({
    query,
    limit,
    exchange,
  }: {
    query?: string;
    limit?: number;
    exchange?: string;
  }) {
    return this.get('stable/search-symbol', {
      query,
      limit,
      exchange,
    });
  }

  stockScreenerAPI({
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
  }) {
    return this.get('stable/company-screener', {
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
  }

  stockListAPI() {
    return this.get('api/v3/stock/list');
  }

  stockDailyPriceAPI({
    ticker,
    from,
    to,
  }: {
    ticker: string;
    from?: string;
    to?: string;
  }): Promise<StockDailyPriceApiProps[]> {
    return this.getStockDailyPriceWithFallback({
      ticker,
      from,
      to,
    });
  }

  private async getStockDailyPriceWithFallback({
    ticker,
    from,
    to,
  }: {
    ticker: string;
    from?: string;
    to?: string;
  }): Promise<StockDailyPriceApiProps[]> {
    try {
      return await this.get('stable/historical-price-eod/full', {
        symbol: ticker,
        from,
        to,
      });
    } catch (error) {
      const status = (error as AxiosError).response?.status;

      // Some keys/plans cannot access the "stable" endpoint, so use the v3 equivalent.
      if (status === 401 || status === 403 || status === 404) {
        const response = await this.get<{
          historical?: StockDailyPriceApiProps[];
        }>(`api/v3/historical-price-full/${ticker}`, {
          from,
          to,
        });

        return response.historical ?? [];
      }

      throw error;
    }
  }

  incomeStatementAPI({
    symbol,
    limit,
    period,
  }: {
    symbol: string;
    limit?: number;
    period?: string;
  }): Promise<IncomeStatementApiResponseProps[]> {
    return this.get('stable/income-statement', {
      symbol,
      limit,
      period,
    });
  }

  balanceSheetAPI({
    symbol,
    limit,
    period,
  }: {
    symbol: string;
    limit?: number;
    period?: string;
  }) {
    return this.get('stable/balance-sheet-statement', {
      symbol,
      limit,
      period,
    });
  }

  availableCountriesAPI() {
    return this.get('stable/available-countries');
  }

  availableSectorsAPI(): Promise<AvailableSectorProps[]> {
    return this.get('stable/available-sectors');
  }

  availableIndustriesAPI() {
    return this.get('stable/available-industries');
  }

  indexHistoryPriceAPI({
    symbol,
  }: {
    symbol: string;
  }): Promise<IndexPriceProps[]> {
    return this.get('stable/historical-price-eod/full', {
      symbol,
    });
  }

  stockChartPriceByHoursMinuteAPI({
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
    return this.get(`stable/historical-chart/${interval}`, {
      symbol,
      from,
      to,
    });
  }

  realTimePriceAPI({
    symbol,
  }: RealTimePriceProps): Promise<RealTimePriceResponseProps[]> {
    return this.get('stable/quote', {
      symbol,
    });
  }
}
