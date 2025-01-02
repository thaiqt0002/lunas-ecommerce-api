import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { CreateExchangeRateCmd, DelateExchangeRateCmd } from './commands'
import { CreateExchangeRateParamsDto } from './exchange-rate.dto'
import { FindAllExchangeRateQr } from './queries'

@Controller()
export default class ExchangeRateController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('exchange-rates.find_all')
  async findAll() {
    return await this.queryBus.execute(new FindAllExchangeRateQr())
  }

  @MessagePattern('exchange-rates.create')
  async create(@Payload() data: CreateExchangeRateParamsDto) {
    await this.commandBus.execute(new CreateExchangeRateCmd(data))
    return 'Create exchange rate success'
  }

  @MessagePattern('exchange-rates.delete')
  async delete(@Payload() data: { id: number }) {
    await this.commandBus.execute(new DelateExchangeRateCmd(data))
    return 'Delete exchange rate success'
  }
}
