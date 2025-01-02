import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import CreateVariantCmd from './commands/create.cmd'
import { CreateVariantDto } from './variant.dto'

@Controller()
export default class VariantController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('variants.create')
  async create(@Payload() data: CreateVariantDto) {
    return await this.commandBus.execute(new CreateVariantCmd(data))
  }
}
