import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { ICreateExchangeRateParams, Prettify } from '~/cores/interfaces'
import { ExchangeRateRepo } from '~/cores/repo'

import ExchangeRateServ from '../exchange-rate.serv'

export default class CreateExchangeRateCmd implements ICommand {
  currency: string
  rate: number
  constructor({ currency, rate }: ICreateExchangeRateParams) {
    this.currency = currency
    this.rate = rate
  }
}

@CommandHandler(CreateExchangeRateCmd)
export class CreateExchangeRateHlr implements ICommandHandler<ICreateExchangeRateParams> {
  constructor(
    private readonly repo: ExchangeRateRepo,
    private readonly serv: ExchangeRateServ,
  ) {}

  public async execute({ currency, rate }: Prettify<ICreateExchangeRateParams>) {
    await this.serv.checkExists(currency)
    await this.create({ currency, rate })
  }

  private async create(params: ICreateExchangeRateParams) {
    const exchangeRate = this.repo.create(params)
    await this.repo.save(exchangeRate)
  }
}
