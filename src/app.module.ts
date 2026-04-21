import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpRetryConfigService } from './http/http-retry.config.service';
import { DemoQueueProcessor } from './queue/demo-queue.processor';
import { DemoQueueProducer } from './queue/demo-queue.producer';
import { DEMO_QUEUE } from './queue/queue.constants';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BullModule.registerQueue({
      name: DEMO_QUEUE,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HttpRetryConfigService,
    DemoQueueProducer,
    DemoQueueProcessor,
  ],
})
export class AppModule {}
