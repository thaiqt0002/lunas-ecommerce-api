import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Request, Response } from 'express'

import { IRes } from '~/cores/interfaces'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('Exception-Filter')

  #loggerInfo(exception: HttpException, host: ArgumentsHost) {
    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const { message: statusMessage } =
      exception instanceof HttpException ? exception : { message: 'Internal Server Error' }
    const { method, originalUrl } = host.switchToHttp().getRequest<Request>()
    const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`

    if (originalUrl === '/favicon.ico') {
      return
    }
    if (originalUrl === '/api/v1/checkhealth') {
      return
    }

    // eslint-disable-next-line
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(message)
    }
    // eslint-disable-next-line
    if (statusCode >= HttpStatus.BAD_REQUEST) {
      this.logger.warn(message)
    }
  }

  #formatResponse(exception: HttpException, host: ArgumentsHost) {
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const responseBody: IRes<null> = {
      statusCode: httpStatus,
      data: null,
      message: null,
      error: {
        code: exception.cause,
        desc: exception.message,
      },
    }

    host.switchToHttp().getResponse<Response>().status(HttpStatus.OK)
    host.switchToHttp().getResponse<Response>().json(responseBody)
  }

  #insertLogger(host: ArgumentsHost) {
    const { originalUrl } = host.switchToHttp().getRequest<Request>()
    if (originalUrl === '/favicon.ico') {
    }
  }

  public catch(exception: HttpException, host: ArgumentsHost): void {
    this.#loggerInfo(exception, host)
    this.#formatResponse(exception, host)
    this.#insertLogger(host)
    super.catch(exception, host)
  }
}
