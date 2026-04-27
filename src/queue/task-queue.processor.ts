import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { TASK_QUEUE } from './queue.constants';

@Processor(TASK_QUEUE, {
  limiter: {
    max: 300,
    duration: 60000,
  },
})
export class TaskQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(TaskQueueProcessor.name);

  process(job: Job<Record<string, unknown>>): Promise<void> {
    switch (job.name) {
      case 'first':
        console.log('calling 1');
        this.logger.log(
          `Processing demo job ${job.id} with payload: ${JSON.stringify(job.data)}`,
        );
        break;
      case 'second':
        console.log('calling 2');
        this.logger.log(
          `Processing demo job ${job.id} with payload: ${JSON.stringify(job.data)}`,
        );
        break;
      default:
        this.logger.warn(`Received unknown job type: ${job.name}`);
        return Promise.resolve();
    }
    return Promise.resolve();
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job): void {
    this.logger.log(`Completed job ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job | undefined, error: Error): void {
    this.logger.error(`Job ${job?.id ?? 'unknown'} failed: ${error.message}`);
  }
}
