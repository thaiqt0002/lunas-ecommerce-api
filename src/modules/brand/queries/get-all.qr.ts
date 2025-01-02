import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { BrandRepo } from '~/cores/repo'

export default class GetAllBrandQr implements IQuery {}
@QueryHandler(GetAllBrandQr)
export class GetAllBrandHandler implements IQueryHandler<GetAllBrandQr> {
  constructor(private readonly repo: BrandRepo) {}

  public async execute() {
    return await this.repo.findAll()
  }
}
