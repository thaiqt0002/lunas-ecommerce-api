import { Global, Module } from '@nestjs/common'

import { S3Serv } from './s3.serv'

@Global()
@Module({
  providers: [S3Serv],
  exports: [S3Serv],
})
export default class S3Module {}
