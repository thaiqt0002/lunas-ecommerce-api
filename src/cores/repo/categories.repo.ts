import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CategoryEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type ICategoryRepo = IBaseRepo<CategoryEntity>
type IRepo = Repository<CategoryEntity>
@Injectable()
class CategoriesRepo extends BaseAbstractRepo<CategoryEntity> implements ICategoryRepo {
  public constructor(@InjectRepository(CategoryEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default CategoriesRepo
