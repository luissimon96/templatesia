type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private isClient: boolean;

  private constructor() {
    this.isClient = typeof window !== 'undefined';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
  }

  debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      const formattedMessage = this.formatMessage('debug', message, meta);
      if (this.isClient) {
        console.debug(formattedMessage);
      } else {
        console.debug(formattedMessage);
      }
    }
  }

  info(message: string, meta?: any): void {
    const formattedMessage = this.formatMessage('info', message, meta);
    if (this.isClient) {
      console.info(formattedMessage);
    } else {
      console.info(formattedMessage);
    }
  }

  warn(message: string, meta?: any): void {
    const formattedMessage = this.formatMessage('warn', message, meta);
    if (this.isClient) {
      console.warn(formattedMessage);
    } else {
      console.warn(formattedMessage);
    }
  }

  error(message: string, error?: Error, meta?: any): void {
    const combinedMeta = error
      ? { ...meta, error: { message: error.message, stack: error.stack } }
      : meta;

    const formattedMessage = this.formatMessage('error', message, combinedMeta);
    if (this.isClient) {
      console.error(formattedMessage);
    } else {
      console.error(formattedMessage);
    }
  }
}

export const logger = Logger.getInstance(); 