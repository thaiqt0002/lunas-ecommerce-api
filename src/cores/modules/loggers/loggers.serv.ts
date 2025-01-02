import { Injectable, Logger, LoggerService } from '@nestjs/common'

import { AnyType } from '~/cores/interfaces'

@Injectable()
class AppLoggerService implements LoggerService {
  private readonly date = new Date().toLocaleString()

  private readonly logger = new Logger('AppLoggerService')

  /**
   * Write a 'log' level log.
   */
  public log(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.log(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }

  /**
   * Write a 'fatal' level log.
   */
  public fatal(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.fatal(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }

  /**
   * Write an 'error' level log.
   */
  public error(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.error(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }

  /**
   * Write a 'warn' level log.
   */
  public warn(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.warn(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }

  /**
   * Write a 'debug' level log.
   */
  public debug?(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.debug(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }

  /**
   * Write a 'verbose' level log.
   */
  public verbose?(message: AnyType, ...optionalParams: AnyType[]): void {
    // eslint-disable-next-line
    this.logger.verbose(`${this.date} - ${message ?? ''}`, ...optionalParams)
  }
}
export default AppLoggerService
