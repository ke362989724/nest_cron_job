import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.log('Prisma connected, but DATABASE_URL is not set.');
      return;
    }

    try {
      const parsed = new URL(dbUrl);
      const databaseName = parsed.pathname.replace(/^\//, '') || '(unknown-db)';
      const host = parsed.hostname || '(unknown-host)';
      const port = parsed.port || '(default-port)';
      console.log(`Prisma connected to ${host}:${port}/${databaseName}`);
    } catch {
      console.log('Prisma connected, but DATABASE_URL could not be parsed.');
    }
  }
}
