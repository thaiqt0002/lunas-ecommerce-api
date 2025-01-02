import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { SeriesRepo } from '~/cores/repo'

export default class GetAllSeriesQr implements IQuery {}

@QueryHandler(GetAllSeriesQr)
export class GetAllSeriesHlr implements IQueryHandler<GetAllSeriesQr> {
  constructor(private readonly repo: SeriesRepo) {}

  public async execute() {
    return await this.repo.findAll()
  }
}
