import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ExchangeRateEntity } from '~/cores/entities'
import { ExchangeRateRepo } from '~/cores/repo'

import { CreateExchangeRateHlr, DeleteExchangeRateHlr } from './commands'
import ExchangeRateController from './exchange-rate.controller'
import ExchangeRateServ from './exchange-rate.serv'
import { FindAllExchangeRateHlr } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([ExchangeRateEntity])],
  providers: [FindAllExchangeRateHlr, CreateExchangeRateHlr, DeleteExchangeRateHlr, ExchangeRateServ, ExchangeRateRepo],
  controllers: [ExchangeRateController],
})
export default class ExchangeRateModule {}
