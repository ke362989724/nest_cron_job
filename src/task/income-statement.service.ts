import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class IncomeStatementService {
  private readonly logger = new Logger(IncomeStatementService.name);

  @Cron('0 0 * * *')
  handleCron() {
    this.logger.debug('Running daily income statement task');
    // 在这里添加获取和处理收入报表的逻辑
  }
}
