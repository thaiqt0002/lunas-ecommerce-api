import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BrandEntity } from '~/cores/entities'

import { BrandsController } from './brand.controller'
import { CreateBrandHandler, DeleteBrandHandler } from './commands'
import { GetAllBrandHandler } from './queries'

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  providers: [CreateBrandHandler, DeleteBrandHandler, GetAllBrandHandler],
  controllers: [BrandsController],
})
export default class BrandModule {}
