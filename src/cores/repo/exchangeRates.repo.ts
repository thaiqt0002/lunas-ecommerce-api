import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ExchangeRateEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type IExchangeRatesRepo = IBaseRepo<ExchangeRateEntity>
type IRepo = Repository<ExchangeRateEntity>
@Injectable()
class ExchangeRatesRepo extends BaseAbstractRepo<ExchangeRateEntity> implements IExchangeRatesRepo {
  public constructor(@InjectRepository(ExchangeRateEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default ExchangeRatesRepo
