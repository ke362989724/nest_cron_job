import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskQueueProducer } from 'src/queue/task-queue.producer';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly taskQueueProducer: TaskQueueProducer,
  ) {}

  async onModuleInit() {
    const tickers = await this.allTicker();

    await this.taskQueueProducer.enqueueTaskJob({
      source: TaskService.name,
      tickerCount: tickers.length,
      firstFiveSymbols: tickers.slice(0, 5).map((ticker) => ticker.symbol),
      triggeredAt: new Date().toISOString(),
    });
  }

  private async allTicker() {
    const tickers = await this.prisma.tickers.findMany({
      select: {
        id: true,
        symbol: true,
      },
    });
    return tickers;
  }
}
