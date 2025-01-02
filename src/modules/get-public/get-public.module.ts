import { Module } from '@nestjs/common'

import PublicController from './get-public.controller'
import BrandModule from '../brand/brand.module'
import CategoryModule from '../category/category.module'
import ProductModule from '../product/product.module'
import SeriesModule from '../series/series.module'
import TagModule from '../tag/tag.module'
import VariantModule from '../variant/variant.module'

@Module({
  imports: [ProductModule, CategoryModule, BrandModule, SeriesModule, TagModule, VariantModule],
  controllers: [PublicController],
})
export default class PublicModule {}
