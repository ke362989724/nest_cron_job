import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { DEMO_JOB, DEMO_QUEUE } from './queue.constants';

@Injectable()
export class TaskQueueProducer {
  constructor(@InjectQueue(DEMO_QUEUE) private readonly demoQueue: Queue) {}

  async enqueueTaskJob(payload: Record<string, unknown>) {
    return this.demoQueue.add(DEMO_JOB, payload, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 6000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
