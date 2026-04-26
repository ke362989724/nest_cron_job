import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FmpApiService } from './http/fmp-api.service';
import { JsonFileLogger } from './logger/json-file.logger';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new JsonFileLogger(AppService.name);

  constructor(
    private readonly fmpApiService: FmpApiService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
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
