import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'

import { ProductRepo } from '~/cores/repo'

export default class GetProductPageQr implements IQuery {}

@QueryHandler(GetProductPageQr)
export class GetProductPageHdr implements IQueryHandler<GetProductPageQr> {
  constructor(private readonly repo: ProductRepo) {}
  async execute() {
    const data = await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        slug: true,
      },
    })
    return data
  }
}
