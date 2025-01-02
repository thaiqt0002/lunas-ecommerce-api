import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { SeriesRepo } from '~/cores/repo'
import { SeriesEntity } from '~/cores/entities'
import { ILike } from 'typeorm'
import { SearchKeywordSeriesDto } from '../series.dto'

export default class SearchKeywordSeriesQr extends SearchKeywordSeriesDto implements IQuery {
  constructor(query: SearchKeywordSeriesDto) {
    super()
    Object.assign(this, query)
  }
}

@QueryHandler(SearchKeywordSeriesQr)
export class SearchKeywordSeriesHlr implements IQueryHandler<SearchKeywordSeriesQr> {
  constructor(private readonly repo: SeriesRepo) {}
  public async execute({ keyword }: SearchKeywordSeriesQr): Promise<SeriesEntity[]> {
    const series = await this.repo.findWithRelations({
      select: ['uuid', 'name', 'slug', 'image'],
      where: { name: ILike(`%${keyword}%`) },
      take: 5,
    })
    return series
  }
}
