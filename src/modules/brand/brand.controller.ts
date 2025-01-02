import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { CreateBrandDto } from './brand.dto'
import { CreateBrandCmd, DeleteBrandCmd } from './commands'
import { GetAllBrandQr } from './queries'

@Controller()
export class BrandsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('brands.find_all')
  async findAll() {
    return await this.queryBus.execute(new GetAllBrandQr())
  }

  @MessagePattern('brands.create')
  async create(@Payload() data: CreateBrandDto) {
    await this.commandBus.execute(new CreateBrandCmd(data))
    return 'Create brand success'
  }

  @MessagePattern('brands.delete')
  async delete(@Payload() uuid: { uuid: string }) {
    await this.commandBus.execute(new DeleteBrandCmd(uuid))
    return 'Delete brand success'
  }
}
