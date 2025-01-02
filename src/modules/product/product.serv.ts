import { Injectable } from '@nestjs/common'
import {
  Between,
  // eslint-disable-next-line
  FindOptionsOrder,
  //eslint-disable-next-line
  FindOptionsOrderValue,
  //eslint-disable-next-line
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm'

import { ProductEntity } from '~/cores/entities'
import { ISearchProductParams } from '~/cores/interfaces'
import { ProductRepo } from '~/cores/repo'

@Injectable()
export default class ProductServ {
  constructor(private readonly repo: ProductRepo) {}
  public async getAllWithFilters(query: ISearchProductParams) {
    const { orderOptions, whereOptions } = this.getProductOptions(query)
    const { limit, offSet, total, totalPages } = await this.getMetadata(query, whereOptions, orderOptions)
    const products = await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        slug: true,
        thumbnail: true,
        salePrice: true,
        country: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true,
        variants: {
          uuid: true,
          name: true,
        },
        parentCategory: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
          updatedAt: true,
        },
        subCategory: {
          uuid: true,
          name: true,
          slug: true,
          updatedAt: true,
        },
        series: {
          uuid: true,
          name: true,
          slug: true,
          updatedAt: true,
          image: true,
        },
      },
      where: { ...whereOptions },
      order: { ...orderOptions },
      skip: offSet,
      take: limit,
      relations: {
        variants: true,
        brand: true,
        parentCategory: true,
        subCategory: true,
        series: true,
        tags: true,
      },
    })
    return {
      products,
      metadata: {
        total,
        totalPages,
        perPage: limit,
        currentPage: query.page,
      },
    }
  }

  private getProductOptions(query: ISearchProductParams) {
    const { search, brandUuids, minPrice, maxPrice, created, updated, price, parentCategoryUuid, subCategoryUuid } =
      query
    const brandOption = brandUuids && brandUuids?.length > 0 ? { brandUuid: In(brandUuids) } : {}
    const searchOption = search ? { name: Like(`%${search}%`) } : {}
    const minPriceOption = minPrice ? { salePrice: MoreThanOrEqual(minPrice) } : {}
    const maxPriceOption = maxPrice ? { salePrice: LessThanOrEqual(maxPrice) } : {}
    const minMaxPriceOption = minPrice && maxPrice ? { salePrice: Between(minPrice, maxPrice) } : {}
    const parentCategoryOption = parentCategoryUuid ? { parentCategoryUuid } : {}
    const subCategoryOption = subCategoryUuid ? { subCategoryUuid } : {}
    const sortCreatedOption =
      created !== undefined && !Number.isNaN(created)
        ? { createdAt: (Number(created) ? 'ASC' : 'DESC') as FindOptionsOrderValue }
        : {}
    const sortUpdatedOption =
      updated !== undefined && !Number.isNaN(updated)
        ? { updatedAt: (Number(updated) ? 'ASC' : 'DESC') as FindOptionsOrderValue }
        : {}
    const sortPriceOption =
      price !== undefined && !Number.isNaN(price)
        ? { salePrice: (Number(price) ? 'ASC' : 'DESC') as FindOptionsOrderValue }
        : {}

    const whereOptions: FindOptionsWhere<ProductEntity> | FindOptionsWhere<ProductEntity[]> | undefined = {
      ...brandOption,
      ...minPriceOption,
      ...maxPriceOption,
      ...(minPrice && maxPrice ? minMaxPriceOption : {}),
      ...(minPrice && !maxPrice ? minPriceOption : {}),
      ...(!minPrice && maxPrice ? maxPriceOption : {}),
      ...searchOption,
      ...parentCategoryOption,
      ...subCategoryOption,
    }

    const orderOptions: FindOptionsOrder<ProductEntity> | undefined = {
      ...sortCreatedOption,
      ...sortUpdatedOption,
      ...sortPriceOption,
    }

    return { whereOptions, orderOptions }
  }

  private async getMetadata(query: ISearchProductParams, whereOptions: any, orderOptions: any) {
    const { limit, page } = query
    const products = await this.repo.findAll({
      select: { uuid: true },
      where: { ...whereOptions },
      order: { ...orderOptions },
    })
    const { length: total } = products
    const totalPages = Math.ceil(total / limit)
    const offSet = (page - 1) * limit
    return { offSet, limit, total, totalPages }
  }
}
