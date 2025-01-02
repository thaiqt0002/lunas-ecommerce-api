import { ArgumentsHost, Catch, Logger } from '@nestjs/common'
import { BaseRpcExceptionFilter, RpcException, TcpContext } from '@nestjs/microservices'
import { Observable } from 'rxjs'

@Catch()
class AllTcpExceptionsFilter extends BaseRpcExceptionFilter {
  private readonly logger = new Logger('Exception-Filter')

  constructor() {
    super()
  }

  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const pattern = host.switchToRpc().getContext<TcpContext>().getPattern()
    if (!exception.getError) {
      const message = `${pattern} ${exception.message}`
      this.logger.error(message)
      return super.catch(exception as RpcException, host)
    }
    const error = exception.getError() as {
      statusCode: string
      message: string
    }
    const message = `${pattern} ${error.statusCode} ${error.message}`
    this.logger.error(message)
    return super.catch(exception, host)
  }
}
export default AllTcpExceptionsFilter
