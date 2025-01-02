import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'

import { ProductTagEntity } from '~/cores/entities'

type IRepo = Repository<ProductTagEntity>
@Injectable()
class ProductTagsRepo {
  public constructor(@InjectRepository(ProductTagEntity) private readonly _: IRepo) {}
  public create(productTags: DeepPartial<ProductTagEntity[]>) {
    return this._.create(productTags)
  }
  public async save(productTags: ProductTagEntity[]) {
    return await this._.save(productTags)
  }
}
export default ProductTagsRepo
