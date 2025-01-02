import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LayoutEntity } from '~/cores/entities'

import { CreateLayoutHldr } from './commands/create.cmd'
import { DeleteLayoutHdlr } from './commands/delete.cmd'
import LayoutController from './layout.controller'
import { GetAllLayoutHlr } from './queries/get-all.qr'

@Module({
  imports: [TypeOrmModule.forFeature([LayoutEntity])],
  providers: [CreateLayoutHldr, DeleteLayoutHdlr, GetAllLayoutHlr],
  controllers: [LayoutController],
})
export default class LayoutModule {}
