import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { MARKET_DATA_QUEUE } from './task-queue.constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: MARKET_DATA_QUEUE,
    }),
  ],
  exports: [BullModule],
})
export class MarketDataQueueModule {}
