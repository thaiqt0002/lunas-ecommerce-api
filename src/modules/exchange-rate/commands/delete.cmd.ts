import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { IBaseId } from '~/cores/interfaces'
import { ExchangeRateRepo } from '~/cores/repo'

import ExchangeRateServ from '../exchange-rate.serv'

export default class DeleteExchangeRateCmd implements ICommand {
  public readonly id: number
  constructor({ id }: IBaseId) {
    this.id = id
  }
}

@CommandHandler(DeleteExchangeRateCmd)
export class DeleteExchangeRateHlr implements ICommandHandler<IBaseId> {
  constructor(
    private readonly repo: ExchangeRateRepo,
    private readonly serv: ExchangeRateServ,
  ) {}

  public async execute({ id }: IBaseId) {
    await this.serv.checkNotExistsById(id)
    await this.delete(id)
  }

  private async delete(id: number) {
    await this.repo.deleteById(id)
  }
}
