import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as entities from '~/cores/entities'

import { LayoutRepo, ProductImageRepo, TemplateRepo } from '.'
import BrandRepo from './brand.repo'
import CategoriesRepo from './categories.repo'
import ExchangeRatesRepo from './exchangeRates.repo'
import ImagesRepo from './images.repo'
import ProductRepo from './product.repo'
import ProductTagsRepo from './productTags.repo'
import SeriesRepo from './series.repo'
import TagRepo from './tag.repo'
import VariantRepo from './variant.repo'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(Object.values(entities))],
  providers: [
    CategoriesRepo,
    SeriesRepo,
    ExchangeRatesRepo,
    ProductRepo,
    ImagesRepo,
    VariantRepo,
    ProductTagsRepo,
    TagRepo,
    BrandRepo,
    ProductImageRepo,
    LayoutRepo,
    TemplateRepo,
  ],
  exports: [
    CategoriesRepo,
    SeriesRepo,
    ExchangeRatesRepo,
    ProductRepo,
    ImagesRepo,
    VariantRepo,
    ProductTagsRepo,
    TagRepo,
    BrandRepo,
    ProductImageRepo,
    LayoutRepo,
    TemplateRepo,
  ],
})
export default class ReposModule {}
