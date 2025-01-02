import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { CreateSeriesCmd, DeleteSeriesCmd } from './commands'
import { GetAllSeriesQr } from './queries'
import { CreateSeriesDto } from './series.dto'
import SearchKeywordSeriesQr from './queries/search-keyword.qr'

@Controller()
export default class SeriesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('series.healthcheck')
  checkHealth(): string {
    return 'I am alive'
  }

  @MessagePattern('series.find_all')
  async findAll() {
    return await this.queryBus.execute(new GetAllSeriesQr())
  }

  @MessagePattern('series.search')
  async search(@Payload() keyword: string) {
    return await this.queryBus.execute(new SearchKeywordSeriesQr({ keyword }))
  }

  @MessagePattern('series.create')
  async create(@Payload() data: CreateSeriesDto) {
    const preSignedUrl: string = await this.commandBus.execute(new CreateSeriesCmd(data))
    return { preSignedUrl }
  }

  @MessagePattern('series.delete')
  async delete(@Payload() data: { uuid: string }) {
    await this.commandBus.execute(new DeleteSeriesCmd(data))
    return 'Delete a series success'
  }
}
