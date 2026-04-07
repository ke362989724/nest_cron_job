import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private logger = new Logger();

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.log(message, JSON.stringify(meta || {}));
  }

  error(
    message: string,
    error?: Error | unknown,
    meta?: Record<string, unknown>,
  ): void {
    const errorMsg = error instanceof Error ? error.message : String(error);
    this.logger.error(`${message}: ${errorMsg}`, JSON.stringify(meta || {}));
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(message, JSON.stringify(meta || {}));
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(message, JSON.stringify(meta || {}));
  }
}
