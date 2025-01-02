import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { LayoutEntity } from '../entities'

type ILayoutRepo = IBaseRepo<LayoutEntity>
type IRepo = Repository<LayoutEntity>
@Injectable()
class LayoutRepo extends BaseAbstractRepo<LayoutEntity> implements ILayoutRepo {
  public constructor(@InjectRepository(LayoutEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default LayoutRepo
