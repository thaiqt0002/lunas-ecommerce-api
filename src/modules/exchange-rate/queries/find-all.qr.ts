import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ExchangeRateRepo } from '~/cores/repo'

export default class FindAllExchangeRateQr implements IQuery {}

@QueryHandler(FindAllExchangeRateQr)
export class FindAllExchangeRateHlr implements IQueryHandler<FindAllExchangeRateQr> {
  constructor(private readonly repo: ExchangeRateRepo) {}
  public async execute() {
    return await this.repo.findAll()
  }
}
