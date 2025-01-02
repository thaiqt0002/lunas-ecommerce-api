import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { IBaseId } from '~/cores/interfaces'

import { CreateManyTagCmd, DeleteTagCmd } from './commands'
import { FindAllTagQuery } from './queries'
import { CreateManyTagParamsDto } from './tag.dto'

@Controller()
export default class TagController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('tags.find_all')
  async findAll() {
    return await this.queryBus.execute(new FindAllTagQuery())
  }

  @MessagePattern('tags.create')
  async create(@Payload() data: CreateManyTagParamsDto) {
    await this.commandBus.execute(new CreateManyTagCmd(data))
    return 'Create tag success'
  }

  @MessagePattern('tags.delete')
  async delete(@Payload() data: IBaseId) {
    await this.commandBus.execute(new DeleteTagCmd(data))
    return 'Delete tag success'
  }
}
