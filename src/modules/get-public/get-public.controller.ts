import { Controller } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { BaseUuidDto } from '~/cores/dtos'
import { ISearchProductParams } from '~/cores/interfaces'

import { GetAllBrandQr } from '../brand/queries'
import GetPublicCategoriesQr from '../category/queries/get-public.qr'
import GetProductDetailQr from '../product/queries/get-detail.qr'
import GetHomePageQr from '../product/queries/homepage.qr'
import GetProductPageQr from '../product/queries/product-page.qr'
import SearchProductQr from '../product/queries/search.qr'
import { GetAllSeriesQr } from '../series/queries'
import { FindAllTagQuery } from '../tag/queries'
import GetVariantDetailQr from '../variant/queries/get-detail.qr'

@Controller()
export default class PublicController {
  constructor(private readonly queryBus: QueryBus) {}
  @MessagePattern('public.page.products')
  async getProductPage() {
    return await this.queryBus.execute(new GetProductPageQr())
  }

  @MessagePattern('public.product.get')
  async findProduct(@Payload() data: ISearchProductParams) {
    return await this.queryBus.execute(new SearchProductQr(data))
  }
  @MessagePattern('public.product.detail')
  findProductDetail(@Payload() { uuid }: BaseUuidDto) {
    return this.queryBus.execute(new GetProductDetailQr(uuid))
  }

  @MessagePattern('public.product.homepage')
  async findHomePage() {
    return await this.queryBus.execute(new GetHomePageQr())
  }

  @MessagePattern('public.category.get')
  async findCategory() {
    return await this.queryBus.execute(new GetPublicCategoriesQr())
  }

  @MessagePattern('public.brand.get')
  async findBrand() {
    return await this.queryBus.execute(new GetAllBrandQr())
  }

  @MessagePattern('public.series.get')
  async findSeries() {
    return await this.queryBus.execute(new GetAllSeriesQr())
  }
  @MessagePattern('public.tags.get')
  async findTags() {
    return await this.queryBus.execute(new FindAllTagQuery())
  }

  @MessagePattern('public.variant.detail')
  async findVariantDetail(@Payload() uuid: string) {
    return await this.queryBus.execute(new GetVariantDetailQr(uuid))
  }
}
