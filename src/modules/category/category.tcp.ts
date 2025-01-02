import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { ICreateCategoryParams } from '~/cores/interfaces'

import { CreateCategoryCmd, DeleteCategoryCmd } from './commands'
import { FindAllCategoryQr } from './queries'
import GetAllCategoryQr from './queries/get-public.qr'

@Controller()
export default class CategoryTCPController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('categories.healthcheck')
  checkHealth(): string {
    return 'I am alive'
  }

  @MessagePattern('categories.find_all')
  async findAll() {
    return await this.queryBus.execute(new FindAllCategoryQr())
  }

  @MessagePattern('categories.create')
  async create(@Payload() data: ICreateCategoryParams) {
    await this.commandBus.execute(new CreateCategoryCmd(data))
    return 'Create a new category success'
  }

  @MessagePattern('categories.delete')
  async delete(@Payload() data: { uuid: string }) {
    await this.commandBus.execute(new DeleteCategoryCmd(data))
    return 'Delete a category success'
  }
}
