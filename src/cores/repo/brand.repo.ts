import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BrandEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type IBrandRepo = IBaseRepo<BrandEntity>
type IRepo = Repository<BrandEntity>
@Injectable()
export default class BrandRepo extends BaseAbstractRepo<BrandEntity> implements IBrandRepo {
  public constructor(@InjectRepository(BrandEntity) private readonly _: IRepo) {
    super(_)
  }
}
