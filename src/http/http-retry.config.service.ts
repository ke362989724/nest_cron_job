import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class HttpRetryConfigService implements OnModuleInit {
  private readonly logger = new Logger(HttpRetryConfigService.name);

  constructor(private readonly httpService: HttpService) {}

  onModuleInit(): void {
    axiosRetry(this.httpService.axiosRef, {
      retries: 3,
      retryDelay: (retryCount) => retryCount * 1000,
      retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error) ||
        (error.response?.status !== undefined && error.response.status >= 500),
      onRetry: (retryCount, error, requestConfig) => {
        this.logger.warn(
          `Retry #${retryCount} for ${requestConfig?.method?.toUpperCase()} ${requestConfig?.url}: ${error.message}`,
        );
      },
    });

    this.logger.log('Axios retry policy configured with 3 retries');
  }
}
