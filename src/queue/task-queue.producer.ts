import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { TASK_QUEUE } from './queue.constants';

@Injectable()
export class TaskQueueProducer {
  constructor(@InjectQueue(TASK_QUEUE) private readonly demoQueue: Queue) {}

  async enqueueTaskJob(
    taskName: string,
    payload: Record<string, unknown>,
    priority = 1,
  ) {
    return this.demoQueue.add(taskName, payload, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 6000,
      },
      removeOnComplete: true,
      removeOnFail: false,
      priority,
    });
  }
}
