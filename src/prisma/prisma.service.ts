import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { existsSync, readFileSync } from 'node:fs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static loadRuntimeEnvFiles(): void {
    const env = process.env['NODE_ENV']?.trim() || 'development';
    const dotenvFiles = [
      `.env.${env}.local`,
      `.env.${env}`,
      '.env.local',
      '.env',
    ];

    for (const file of dotenvFiles) {
      if (!existsSync(file)) continue;

      const content = readFileSync(file, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const separator = trimmed.indexOf('=');
        if (separator < 1) continue;

        const key = trimmed.slice(0, separator).trim();
        const value = trimmed.slice(separator + 1).trim();
        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    }
  }

  constructor() {
    PrismaService.loadRuntimeEnvFiles();

    const connectionString = process.env['DATABASE_URL'];

    if (!connectionString) {
      throw new Error('DATABASE_URL is required to initialize PrismaClient');
    }

    super({
      adapter: new PrismaPg({ connectionString }),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
