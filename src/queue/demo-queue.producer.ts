import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { DEMO_JOB, DEMO_QUEUE } from './queue.constants';

@Injectable()
export class DemoQueueProducer {
  constructor(@InjectQueue(DEMO_QUEUE) private readonly demoQueue: Queue) {}

  async enqueueDemoJob(payload: Record<string, unknown>) {
    return this.demoQueue.add(DEMO_JOB, payload, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
