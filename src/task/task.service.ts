import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  FETCH_MARKET_DATA_JOB,
  FetchMarketDataJobPayload,
  MARKET_DATA_QUEUE,
} from './task-queue.constants';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectQueue(MARKET_DATA_QUEUE)
    private readonly marketDataQueue: Queue<FetchMarketDataJobPayload>,
  ) {}

  async enqueueMarketData(symbols: string[]) {
    const normalizedSymbols = [
      ...new Set(symbols.map((item) => item.trim().toUpperCase())),
    ].filter(Boolean);

    if (normalizedSymbols.length === 0) {
      return {
        accepted: 0,
        message: 'No valid symbols were provided.',
      };
    }

    const jobOptions: JobsOptions = {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2_000,
      },
      removeOnComplete: 1_000,
      removeOnFail: 5_000,
    };

    for (const symbol of normalizedSymbols) {
      await this.marketDataQueue.add(
        FETCH_MARKET_DATA_JOB,
        {
          symbol,
          requestedAt: new Date().toISOString(),
        },
        {
          ...jobOptions,
          jobId: `${symbol}:${Date.now()}`,
        },
      );
    }

    return {
      accepted: normalizedSymbols.length,
      queue: MARKET_DATA_QUEUE,
      rateLimit: '300 jobs per minute',
    };
  }

  async fetchMarketData(symbol: string) {
    const baseUrl = process.env.MARKET_DATA_API_BASE_URL;
    if (!baseUrl) {
      this.logger.warn(
        'MARKET_DATA_API_BASE_URL is not set. Skipping external API call.',
      );
      return;
    }

    const url = `${baseUrl.replace(/\/$/, '')}/${encodeURIComponent(symbol)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Market API request failed for ${symbol}: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as unknown;

    // TODO: persist data with Prisma using idempotent upsert logic.
    this.logger.log(`Fetched market data for ${symbol}.`);
    void data;
  }

  create(createTaskDto: CreateTaskDto) {
    void createTaskDto;
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    void updateTaskDto;
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
