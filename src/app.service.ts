import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FmpApiService } from './http/fmp-api.service';
import { JsonFileLogger } from './logger/json-file.logger';

@Injectable()
export class AppService {
  private readonly logger = new JsonFileLogger(AppService.name);

  constructor(
    private readonly fmpApiService: FmpApiService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
