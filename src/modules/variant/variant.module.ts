import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { VariantEntity } from '~/cores/entities'
import { VariantRepo } from '~/cores/repo'

import { CreateVariantHdlr } from './commands/create.cmd'
import { DeleteVariantHdlr } from './commands/delete.cmd'
import { GetVariantDetailHldr } from './queries/get-detail.qr'
import VariantController from './variant.controller'

@Module({
  imports: [TypeOrmModule.forFeature([VariantEntity])],
  providers: [VariantRepo, CreateVariantHdlr, DeleteVariantHdlr, GetVariantDetailHldr],
  controllers: [VariantController],
})
export default class VariantModule {}
