import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ProductEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type IProductRepo = IBaseRepo<ProductEntity>
type IRepo = Repository<ProductEntity>
@Injectable()
class ProductRepo extends BaseAbstractRepo<ProductEntity> implements IProductRepo {
  public constructor(@InjectRepository(ProductEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default ProductRepo
