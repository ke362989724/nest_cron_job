import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MarketDataProcessor } from './market-data.processor';
import { MarketDataQueueModule } from './market-data-queue.module';

@Module({
  imports: [MarketDataQueueModule],
  controllers: [TaskController],
  providers: [TaskService, MarketDataProcessor],
})
export class TaskModule {}
