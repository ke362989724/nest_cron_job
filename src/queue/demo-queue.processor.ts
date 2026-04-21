import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DEMO_JOB, DEMO_QUEUE } from './queue.constants';

@Processor(DEMO_QUEUE)
export class DemoQueueProcessor extends WorkerHost {
  private readonly logger = new Logger(DemoQueueProcessor.name);

  async process(job: Job<Record<string, unknown>>): Promise<void> {
    if (job.name !== DEMO_JOB) {
      this.logger.warn(`Received unknown job type: ${job.name}`);
      return;
    }

    this.logger.log(
      `Processing demo job ${job.id} with payload: ${JSON.stringify(job.data)}`,
    );
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
