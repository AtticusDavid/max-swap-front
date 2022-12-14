interface Logger {
  debug(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
}

class DevelopmentLogger implements Logger {
  debug(message?: any, ...optionalParams: any[]) {
    // eslint-disable-next-line no-console
    console.debug(message, ...optionalParams);
  }
  log(message?: any, ...optionalParams: any[]) {
    // eslint-disable-next-line no-console
    console.log(message, ...optionalParams);
  }
  warn(message?: any, ...optionalParams: any[]) {
    // eslint-disable-next-line no-console
    console.warn(message, ...optionalParams);
  }
  error(message?: any, ...optionalParams: any[]) {
    // eslint-disable-next-line no-console
    console.error(message, ...optionalParams);
  }
}

class ProductionLogger implements Logger {
  debug(message?: any, ...optionalParams: any[]) {
    // TODO: logging on Sentry or GA
  }
  log(message?: any, ...optionalParams: any[]) {
    // TODO: logging on Sentry or GA
  }
  warn(message?: any, ...optionalParams: any[]) {
    // TODO: logging on Sentry or GA
  }
  error(message?: any, ...optionalParams: any[]) {
    // TODO: logging on Sentry or GA
  }
}

class LoggerFactory {
  public static createLogger(): Logger {
    if (process.env.NODE_ENV === 'development') {
      return new DevelopmentLogger();
    }
    return new ProductionLogger();
  }
}

export const logger = LoggerFactory.createLogger();
