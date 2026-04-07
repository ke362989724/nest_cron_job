import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

const DEFAULT_REDIS_PORT = 6379;

function resolveRedisConnection() {
  const redisPort = Number(process.env.REDIS_PORT || DEFAULT_REDIS_PORT);

  if (process.env.REDIS_URL) {
    return { url: process.env.REDIS_URL };
  }

  return {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number.isNaN(redisPort) ? DEFAULT_REDIS_PORT : redisPort,
    password: process.env.REDIS_PASSWORD,
  };
}

@Module({
  imports: [
    BullModule.forRoot({
      connection: resolveRedisConnection(),
    }),
  ],
  exports: [BullModule],
})
export class BullRootModule {}
