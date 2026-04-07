import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  FETCH_MARKET_DATA_JOB,
  FetchMarketDataJobPayload,
  MARKET_DATA_QUEUE,
} from './task-queue.constants';
import { TaskService } from './task.service';

@Processor(MARKET_DATA_QUEUE, {
  concurrency: 10,
  limiter: {
    max: 300,
    duration: 60_000,
  },
})
export class MarketDataProcessor extends WorkerHost {
  private readonly logger = new Logger(MarketDataProcessor.name);

  constructor(private readonly taskService: TaskService) {
    super();
  }

  async process(job: Job<FetchMarketDataJobPayload>): Promise<void> {
    if (job.name !== FETCH_MARKET_DATA_JOB) {
      this.logger.warn(`Unknown job name: ${job.name}`);
      return;
    }

    const symbol = String(job.data.symbol);
    await this.taskService.fetchMarketData(symbol);
  }
}
