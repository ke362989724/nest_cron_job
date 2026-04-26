import { ConsoleLogger, LogLevel } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

export class JsonFileLogger extends ConsoleLogger {
  private readonly logsDir: string;

  constructor(context?: string) {
    super(context ?? 'Application', {
      json: true,
      timestamp: true,
    });

    this.logsDir = path.resolve(
      process.env.LOG_DIR ?? path.join(process.cwd(), 'logs'),
    );
    fs.mkdirSync(this.logsDir, { recursive: true });
  }

  log(message: any, context?: string): void {
    this.writeToFile('log', message, context);
    super.log(message, context);
  }

  error(message: any, stack?: string, context?: string): void {
    this.writeToFile('error', message, context, stack);
    super.error(message, stack, context);
  }

  warn(message: any, context?: string): void {
    this.writeToFile('warn', message, context);
    super.warn(message, context);
  }

  debug(message: any, context?: string): void {
    this.writeToFile('debug', message, context);
    super.debug(message, context);
  }

  verbose(message: any, context?: string): void {
    this.writeToFile('verbose', message, context);
    super.verbose(message, context);
  }

  fatal(message: any, context?: string): void {
    this.writeToFile('fatal', message, context);
    super.fatal(message, context);
  }

  private writeToFile(
    level: LogLevel | 'fatal',
    message: any,
    context?: string,
    stack?: string,
  ): void {
    const payload: Record<string, unknown> = {
      timestamp: Math.floor(Date.now() / 1000),
      level,
      context,
      message,
    };

    if (stack) {
      payload.stack = stack;
    }

    const line = `${JSON.stringify(payload)}\n`;
    const appLogFilePath = path.join(
      this.logsDir,
      this.getDatedFileName('app'),
    );
    const levelFilePath = path.join(
      this.logsDir,
      this.getDatedFileName(this.getLevelFileName(level)),
    );

    fs.appendFileSync(appLogFilePath, line, { encoding: 'utf8' });
    fs.appendFileSync(levelFilePath, line, { encoding: 'utf8' });
  }

  private getDatedFileName(baseName: string): string {
    return `${this.getDateString()}-${baseName}.log`;
  }

  private getDateString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private getLevelFileName(level: LogLevel | 'fatal'): string {
    if (level === 'log') {
      return 'info';
    }

    return level;
  }
}
