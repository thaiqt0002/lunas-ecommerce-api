import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import CreateTemplateCmd from './commands/create.cmd'
import DeleteTemplateCmd from './commands/delete.cmd'
import UpdateTemplateCmd from './commands/update.cmd'
import GetAllTemplateQr from './queries/get-all.cmd'
import { CreateTemplateDto, GetTemplateDto, UpdateTemplateDto } from './template.dto'
import GetTemplateByPageQr from './queries/get-by-page.cmd'

@Controller()
export default class TemplateController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('template.healthcheck')
  checkHealth(): string {
    return 'I am alive'
  }

  @MessagePattern('template.find_all')
  async findAll() {
    return await this.queryBus.execute(new GetAllTemplateQr())
  }

  @MessagePattern('template.create')
  async create(@Payload() data: CreateTemplateDto) {
    const preSignedUrl: string = await this.commandBus.execute(new CreateTemplateCmd(data))
    return { preSignedUrl }
  }

  @MessagePattern('template.delete')
  async delete(@Payload() data: { id: number }) {
    await this.commandBus.execute(new DeleteTemplateCmd(data))
    return 'Delete a template success'
  }

  @MessagePattern('template.update')
  async update(@Payload() data: UpdateTemplateDto) {
    await this.commandBus.execute(new UpdateTemplateCmd(data))
    return 'Update a template success'
  }

  @MessagePattern('template.get_by_page')
  async getByPage(@Payload() { page }: GetTemplateDto) {
    return await this.queryBus.execute(new GetTemplateByPageQr(page))
  }
}
