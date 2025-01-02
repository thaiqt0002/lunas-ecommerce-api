import { Global, Module } from '@nestjs/common'

import { HelperServ } from './helper.serv'

@Global()
@Module({
  providers: [HelperServ],
  exports: [HelperServ],
})
export default class HelperModule {}
