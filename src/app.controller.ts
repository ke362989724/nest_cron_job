import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskQueueProducer } from './queue/task-queue.producer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly taskQueueProducer: TaskQueueProducer,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
