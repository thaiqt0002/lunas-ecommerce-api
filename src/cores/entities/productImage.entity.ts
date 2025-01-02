import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import ProductEntity from './product.entity'
import { IBaseProductImage } from '../interfaces'

@Entity({ name: 'ProductImage' })
class ProductImageEntity implements IBaseProductImage {
  @PrimaryColumn({ type: 'char', length: 36, name: 'uuid' })
  uuid!: string

  @Column('char', { name: 'product_uuid', length: 36 })
  productUuid!: string

  @ManyToOne(() => ProductEntity, (product) => product.productImages, {})
  @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
  product!: ProductEntity

  @Column('varchar', { name: 'image_url', length: 255, unique: true })
  imageUrl!: string
}

export default ProductImageEntity
