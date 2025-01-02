import { Global, Module } from '@nestjs/common'

import EmailServ from './email.serv'

@Global()
@Module({
  providers: [EmailServ],
  exports: [EmailServ],
})
export default class EmailModule {}
