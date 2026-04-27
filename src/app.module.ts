import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FmpApiService } from './http/fmp-api.service';
import { HttpRetryConfigService } from './http/http-retry.config.service';
import { TaskQueueProcessor } from './queue/task-queue.processor';
import { TaskQueueProducer } from './queue/task-queue.producer';
import { TASK_QUEUE } from './queue/queue.constants';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';

const nodeEnv = process.env.NODE_ENV ?? 'development';
const envFilePath =
  nodeEnv === 'uat' ? ['env.uat', '.env.uat'] : [`.env.${nodeEnv}`];

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: 5000,
        maxRedirects: 5,
        baseURL: configService.get<string>('FMP_BASE_URL'),
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST', '127.0.0.1'),
          port: Number(configService.get<number>('REDIS_PORT', 6379)),
          password: configService.get<string>('REDIS_PASSWORD') || undefined,
        },
      }),
    }),
    BullModule.registerQueue({
      name: TASK_QUEUE,
    }),
    BullModule.registerQueue({
      name: 'task-queue',
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FmpApiService,
    HttpRetryConfigService,
    TaskQueueProducer,
    TaskQueueProcessor,
  ],
})
export class AppModule {}
