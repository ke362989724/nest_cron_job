import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FmpApiService } from './http/fmp-api.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly fmpApiService: FmpApiService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    const ticker = this.configService.get<string>('FMP_TEST_TICKER', 'AAPL');

    try {
      const result = await this.fmpApiService.stockDailyPriceAPI({ ticker });
      this.logger.log(
        `stockDailyPriceAPI called for ${ticker}. Returned ${result.length} rows.`,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`stockDailyPriceAPI call failed: ${message}`);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
