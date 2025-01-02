import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SeriesEntity } from '~/cores/entities'
import { SeriesRepo } from '~/cores/repo'

import { CreateSeriesHandler, DeleteSeriesHandler } from './commands'
import { GetAllSeriesHlr } from './queries'
import SeriesController from './series.controller'
import { SearchKeywordSeriesHlr } from './queries/search-keyword.qr'

@Module({
  imports: [TypeOrmModule.forFeature([SeriesEntity])],
  providers: [GetAllSeriesHlr, CreateSeriesHandler, DeleteSeriesHandler, SeriesRepo, SearchKeywordSeriesHlr],
  controllers: [SeriesController],
})
export default class SeriesModule {}
