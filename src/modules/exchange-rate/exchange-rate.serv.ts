import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ExchangeRateRepo } from '~/cores/repo'

@Injectable()
export default class ExchangeRateServ {
  constructor(private readonly repo: ExchangeRateRepo) {}

  public async checkExists(currency: string, enableThrow = true) {
    const exchangeRate = await this.repo.findOne({
      where: { currency },
    })
    if (exchangeRate && enableThrow) {
      throw new RpcException(ERRORS.EXCHANGE_RATE_ALREADY_EXISTS)
    }
    return Boolean(exchangeRate)
  }

  public async checkNotExistsById(id: number, enableThrow = true) {
    const exchangeRate = await this.repo.findOneById(id)
    if (!exchangeRate && enableThrow) {
      throw new RpcException(ERRORS.EXCHANGE_RATE_NOT_FOUND)
    }
    return Boolean(exchangeRate)
  }
}
