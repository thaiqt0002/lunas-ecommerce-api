import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TemplateEntity } from '~/cores/entities'

import { CreateTemplateHldr } from './commands/create.cmd'
import { DeleteTemplateHdlr } from './commands/delete.cmd'
import { UpdateTemplateHldr } from './commands/update.cmd'
import { GetAllTemplateHlr } from './queries/get-all.cmd'
import { GetTemplateByPageHlr } from './queries/get-by-page.cmd'
import TemplateController from './template.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  providers: [CreateTemplateHldr, DeleteTemplateHdlr, GetAllTemplateHlr, UpdateTemplateHldr, GetTemplateByPageHlr],
  controllers: [TemplateController],
})
export default class TemplateModule {}
