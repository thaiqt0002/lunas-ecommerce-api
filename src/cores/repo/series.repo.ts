import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { SeriesEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type ISeriesRepo = IBaseRepo<SeriesEntity>
type IRepo = Repository<SeriesEntity>
@Injectable()
export default class SeriesRepo extends BaseAbstractRepo<SeriesEntity> implements ISeriesRepo {
  public constructor(@InjectRepository(SeriesEntity) private readonly _: IRepo) {
    super(_)
  }
}
