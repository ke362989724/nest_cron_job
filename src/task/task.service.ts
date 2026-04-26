import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.allTicker();
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
