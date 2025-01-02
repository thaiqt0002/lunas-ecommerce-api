import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { VariantEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type IVariantRepo = IBaseRepo<VariantEntity>
type IRepo = Repository<VariantEntity>
@Injectable()
class VariantRepo extends BaseAbstractRepo<VariantEntity> implements IVariantRepo {
  public constructor(@InjectRepository(VariantEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default VariantRepo
