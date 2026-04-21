import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DemoQueueProducer } from './queue/demo-queue.producer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly demoQueueProducer: DemoQueueProducer,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('jobs/demo')
  async enqueueDemoJob() {
    const job = await this.demoQueueProducer.enqueueDemoJob({
      createdAt: new Date().toISOString(),
      source: 'app-controller',
    });

    return {
      message: 'Demo job enqueued',
      jobId: job.id,
      queueName: job.queueName,
    };
  }
}
