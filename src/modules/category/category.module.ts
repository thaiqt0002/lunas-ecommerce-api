import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CategoryEntity } from '~/cores/entities'
import { CategoryRepo } from '~/cores/repo'

import CategoryTCPController from './category.tcp'
import { CreateCategoryHlr, DeleteCategoryHlr } from './commands'
import { FindAllCategoryHlr } from './queries'
import { GetPublicCategoriesHlr } from './queries/get-public.qr'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [FindAllCategoryHlr, CreateCategoryHlr, DeleteCategoryHlr, CategoryRepo, GetPublicCategoriesHlr],
  controllers: [CategoryTCPController],
})
export default class CategoryModule {}
