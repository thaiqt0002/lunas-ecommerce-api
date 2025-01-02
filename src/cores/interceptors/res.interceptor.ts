import { CallHandler, ExecutionContext, HttpStatus, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { IRes } from '../interfaces'

@Injectable()
export class ResponseInterceptor<Type> implements NestInterceptor<Type, IRes<Type>> {
  readonly #logger = new Logger('Interceptor')

  #transformData(next: CallHandler<unknown>, ctx: ExecutionContext): Observable<IRes<Type>> {
    const { statusCode } = ctx.switchToHttp().getResponse<Response>()
    ctx.switchToHttp().getResponse<Response>().status(HttpStatus.OK)
    // eslint-disable-next-line
    return next.handle().pipe(
      map((data) => {
        if (typeof data === 'string') {
          return {
            statusCode,
            data: null,
            message: data,
            error: null,
          }
        }
        return {
          statusCode,
          data,
          message: null,
          error: null,
        }
      }),
    ) as Observable<IRes<Type>>
  }

  #acceptOrignalUrl(originalUrl: string): boolean {
    const FAVICON = '/favicon.ico'
    const CHECKHEALTH = '/api/v1/checkhealth'
    return originalUrl === FAVICON || originalUrl === CHECKHEALTH
  }

  #loggerInfo(ctx: ExecutionContext) {
    const { method, originalUrl, ip } = ctx.switchToHttp().getRequest<Request>()
    const { statusMessage, statusCode } = ctx.switchToHttp().getResponse<Response>()
    const message = `${method} ${originalUrl} ${statusCode} ${ip ?? ''} ${statusMessage}`

    if (this.#acceptOrignalUrl(originalUrl)) {
      return
    }
    // eslint-disable-next-line
    if (statusCode < HttpStatus.BAD_REQUEST) {
      this.#logger.log(message)
    }
  }

  #insertLogger(ctx: ExecutionContext) {
    const { originalUrl } = ctx.switchToHttp().getRequest<Request>()
    if (this.#acceptOrignalUrl(originalUrl)) {
    }
  }

  public intercept(ctx: ExecutionContext, next: CallHandler): Observable<IRes<Type>> {
    this.#loggerInfo(ctx)
    this.#insertLogger(ctx)
    return this.#transformData(next, ctx)
  }
}
