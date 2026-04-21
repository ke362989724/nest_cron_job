import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpRetryConfigService implements OnModuleInit {
  private readonly logger = new Logger(HttpRetryConfigService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit(): void {
    const apiKey = this.configService.get<string>('FMP_API_KEY')?.trim();

    if (!apiKey) {
      this.logger.warn('FMP_API_KEY is empty. FMP requests may return 401.');
    }

    this.httpService.axiosRef.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        config.params = config.params ?? {};

        if (apiKey) {
          config.params.apikey = apiKey;
        }

        return config;
      },
    );

    axiosRetry(this.httpService.axiosRef, {
      retries: 30,
      retryDelay: (retryCount) => retryCount * 3 * 1000,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status !== undefined && error.response.status >= 500),
      onRetry: (retryCount, error, requestConfig) => {
        this.logger.warn(
          `Retry #${retryCount} for ${requestConfig?.method?.toUpperCase()} ${requestConfig?.url}: ${error.message}`,
        );
      },
    });

    this.httpService.axiosRef.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error),
    );

    this.logger.log('Axios retry policy configured for FMP requests');
  }
}
