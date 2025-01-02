import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import CreateLayoutCmd from './commands/create.cmd'
import DeleteLayoutCmd from './commands/delete.cmd'
import { CreateLayoutDto } from './layout.dto'
import GetAllLayoutQr from './queries/get-all.qr'

@Controller()
export default class LayoutController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('layout.healthcheck')
  checkHealth(): string {
    return 'I am alive'
  }

  @MessagePattern('layout.find_all')
  async findAll() {
    return await this.queryBus.execute(new GetAllLayoutQr())
  }

  @MessagePattern('layout.create')
  async create(@Payload() data: CreateLayoutDto) {
    const preSignedUrl: string = await this.commandBus.execute(new CreateLayoutCmd(data))
    return { preSignedUrl }
  }

  @MessagePattern('layout.delete')
  async delete(@Payload() data: { id: number }) {
    await this.commandBus.execute(new DeleteLayoutCmd(data))
    return 'Delete a layout success'
  }
}
