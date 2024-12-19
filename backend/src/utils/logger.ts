const logLevels = ['error', 'warn', 'info', 'debug'] as const;
type LogLevel = typeof logLevels[number];

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private log(level: LogLevel, message: string, ...args: unknown[]): void {
    console[level](`[${this.getTimestamp()}] ${level.toUpperCase()}: ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    this.log('error', message, ...args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.log('warn', message, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    this.log('info', message, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.log('debug', message, ...args);
  }
}

export const logger = new Logger();