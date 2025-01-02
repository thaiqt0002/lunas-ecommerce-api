import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { ProductImageEntity } from '../entities'

type IProductImagesRepo = IBaseRepo<ProductImageEntity>
type IRepo = Repository<ProductImageEntity>
@Injectable()
class ProductImagesRepo extends BaseAbstractRepo<ProductImageEntity> implements IProductImagesRepo {
  public constructor(@InjectRepository(ProductImageEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default ProductImagesRepo
