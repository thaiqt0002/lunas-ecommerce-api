import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TagEntity } from '~/cores/entities'
import { TagRepo } from '~/cores/repo'

import { CreateManyTagHlr, DeleteTagHandler } from './commands'
import { FindAllTagQueryHlr } from './queries'
import TagController from './tag.controller'

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [FindAllTagQueryHlr, CreateManyTagHlr, DeleteTagHandler, TagRepo],
  controllers: [TagController],
})
export default class TagModule {}
