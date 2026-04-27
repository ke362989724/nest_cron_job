import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { TaskQueueProducer } from 'src/queue/task-queue.producer';
import { DEMO_QUEUE } from 'src/queue/queue.constants';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    BullModule.registerQueue({ name: DEMO_QUEUE }),
  ],
  providers: [TaskService, TaskQueueProducer],
})
export class TaskModule {}
