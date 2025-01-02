import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { IBaseProductTag } from '~/cores/interfaces'

import ProductEntity from './product.entity'
import TagEntity from './tag.entity'

@Entity({ name: 'ProductTag' })
class ProductTagEntity implements IBaseProductTag {
  @PrimaryColumn({ type: 'char', length: 36, name: 'product_uuid' })
  productUuid!: string

  @PrimaryColumn({ type: 'int', name: 'tag_id' })
  tagId!: number

  @ManyToOne(() => TagEntity, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id', referencedColumnName: 'id' })
  tags!: TagEntity[]

  @ManyToOne(() => ProductEntity, (product) => product.uuid)
  @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
  products!: ProductEntity[]
}
export default ProductTagEntity
