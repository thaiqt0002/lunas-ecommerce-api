import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ProductRepo } from '~/cores/repo'
import { SearchKeywordProductDto } from '../product.dto'
import { ProductEntity } from '~/cores/entities'
import { ILike } from 'typeorm'

export default class SearchKeywordProductQr extends SearchKeywordProductDto implements IQuery {
  constructor(query: SearchKeywordProductDto) {
    super()
    Object.assign(this, query)
  }
}

@QueryHandler(SearchKeywordProductQr)
export class SearchKeywordProductHlr implements IQueryHandler<SearchKeywordProductQr> {
  constructor(private readonly repo: ProductRepo) {}
  public async execute(query: SearchKeywordProductQr): Promise<ProductEntity[]> {
    const { keyword } = query
    const products = await this.repo.findWithRelations({
      select: ['uuid', 'name', 'thumbnail', 'salePrice', 'slug'],
      where: { name: ILike(`%${keyword}%`) },
      take: 5,
    })
    return products
  }
}
