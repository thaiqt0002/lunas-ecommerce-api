import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { TagRepo } from '~/cores/repo'

export default class FindAllTagQuery implements IQuery {}

@QueryHandler(FindAllTagQuery)
export class FindAllTagQueryHlr implements IQueryHandler<FindAllTagQuery> {
  public constructor(private readonly repo: TagRepo) {}
  public async execute() {
    return await this.repo.findAll()
  }
}
