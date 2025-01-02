import { Global, Module } from '@nestjs/common'

import EmailModule from './email/email.module'
import { HelperModule } from './helper'
import LoggerModule from './loggers/loggers.module'
import { S3Module } from './S3'

@Global()
@Module({
  imports: [LoggerModule, S3Module, EmailModule, HelperModule],
  exports: [LoggerModule, S3Module, EmailModule, HelperModule],
})
export default class CoreModule {}
