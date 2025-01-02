import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { LayoutRepo } from '~/cores/repo'

export default class GetAllLayoutQr implements IQuery {}

@QueryHandler(GetAllLayoutQr)
export class GetAllLayoutHlr implements IQueryHandler<GetAllLayoutQr> {
  constructor(private readonly repo: LayoutRepo) {}

  public async execute() {
    return await this.repo.findAll()
  }
}
