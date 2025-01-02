import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TemplateRepo } from '~/cores/repo'

export default class GetAllTemplateQr implements IQuery {}

@QueryHandler(GetAllTemplateQr)
export class GetAllTemplateHlr implements IQueryHandler<GetAllTemplateQr> {
  constructor(private readonly repo: TemplateRepo) {}

  public async execute() {
    return await this.repo.findAll()
  }
}
