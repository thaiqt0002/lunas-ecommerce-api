import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ImageEntity, ProductEntity, VariantEntity } from '~/cores/entities'
import { ProductRepo } from '~/cores/repo'

import { CreateProductHdlr } from './commands/create.cmd'
import { DeleteProductHdlr } from './commands/delete.cmd'
import ProductController from './product.controller'
import ProductServ from './product.serv'
import { GetAllProductHlr } from './queries/get-all.qr'
import { GetProductByVariantHlr } from './queries/get-by-variant.qr'
import { GetProductDetailHdlr } from './queries/get-detail.qr'
import { GetHomePageHdr } from './queries/homepage.qr'
import { GetProductPageHdr } from './queries/product-page.qr'
import { SearchProductHdlr } from './queries/search.qr'
import { SearchKeywordProductHlr } from './queries/search-keyword.qr'

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, VariantEntity, ImageEntity])],
  providers: [
    ProductServ,
    ProductRepo,
    CreateProductHdlr,
    DeleteProductHdlr,
    GetAllProductHlr,
    GetProductDetailHdlr,
    GetProductPageHdr,
    GetHomePageHdr,
    SearchProductHdlr,
    GetProductByVariantHlr,
    SearchKeywordProductHlr,
  ],
  controllers: [ProductController],
})
export default class ProductModule {}
