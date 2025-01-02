import { Global, Module } from '@nestjs/common'

import AppLoggerService from './loggers.serv'

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export default class LoggerModule {}
