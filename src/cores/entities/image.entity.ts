import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { IBaseImage } from '~/cores/interfaces'

import ProductEntity from './product.entity'
import VariantEntity from './variant.entity'

@Entity({ name: 'Image' })
class ImageEntity implements IBaseImage {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column('char', { name: 'product_uuid', length: 36 })
  productUuid!: string

  @ManyToOne(() => ProductEntity, (product) => product.images, {})
  @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
  product!: ProductEntity

  @OneToOne(() => VariantEntity, (variant) => variant.image)
  @JoinColumn({ name: 'variant_uuid', referencedColumnName: 'uuid' })
  variantUuid!: string

  @Column('varchar', { name: 'image_url', length: 255 })
  imageUrl!: string
}
export default ImageEntity
