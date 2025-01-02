import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Like } from 'typeorm'

import { IQueryProductParams } from '~/cores/interfaces'
import { ProductRepo } from '~/cores/repo'

export default class GetAllProductQr implements IQuery {
  page!: number
  limit!: number
  sort!: number
  search!: string
  constructor(query: IQueryProductParams) {
    Object.assign(this, query)
  }
}
@QueryHandler(GetAllProductQr)
export class GetAllProductHlr implements IQueryHandler<GetAllProductQr> {
  constructor(private readonly repo: ProductRepo) {}

  public async execute(command: IQueryProductParams) {
    const { search, sort, page } = command
    const metaData = await this.#getMetadata(command)
    const products = await this.repo.findAll({
      select: {
        deletedAt: false,
        seriesUuid: false,
        parentCategoryUuid: false,
        subCategoryUuid: false,
      },
      where: {
        name: Like(`%${search}%`),
      },
      order: {
        createdAt: sort === 1 ? 'ASC' : 'DESC',
      },
      skip: metaData.offSet,
      take: metaData.limit,
      relations: {
        variants: {
          image: true,
        },
        parentCategory: true,
        subCategory: true,
        series: true,
        tags: true,
        productImages: true,
      },
    })
    return {
      products,
      page,
      total: metaData.total,
      totalPages: metaData.totalPages,
    }
  }

  async #getMetadata(query: IQueryProductParams) {
    const { limit, page, search } = query
    const products = await this.repo.findAll({
      select: { uuid: true },
      where: {
        name: Like(`%${search}%`),
      },
    })
    const { length: total } = products
    // eslint-disable-next-line
    const totalPages = Math.ceil(total / limit)
    const offSet = (page - 1) * limit
    return { offSet, limit, total, totalPages }
  }
}
