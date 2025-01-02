import { IQuery, QueryHandler } from '@nestjs/cqrs'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import { ISearchProductParams, Prettify } from '~/cores/interfaces'

import { SearchProductDto } from '../product.dto'
import ProductServ from '../product.serv'

export default class SearchProductQr implements IQuery {
  page!: number
  limit!: number
  search!: string
  brandUuids?: string[]
  minPrice?: number
  maxPrice?: number
  created?: number
  updated?: number
  price?: number
  constructor(query: Prettify<ISearchProductParams>) {
    const transformedQuery = plainToClass(SearchProductDto, query)
    validateOrReject(transformedQuery)
    Object.assign(this, transformedQuery)
  }
}

@QueryHandler(SearchProductQr)
export class SearchProductHdlr {
  constructor(private readonly productServ: ProductServ) {}
  public async execute(command: ISearchProductParams) {
    return await this.productServ.getAllWithFilters(command)
  }
}
