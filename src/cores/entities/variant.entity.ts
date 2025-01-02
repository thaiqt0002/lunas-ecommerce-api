import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'

import { IBaseVariant } from '~/cores/interfaces'

import CartEntity from './cart.entity'
import ImageEntity from './image.entity'
import ProductEntity from './product.entity'

@Entity({ name: 'Variant' })
class VariantEntity implements IBaseVariant {
  @PrimaryColumn('char', { name: 'uuid', length: 36 })
  uuid!: string

  @Column('varchar', { name: 'name', length: 255 })
  name!: string

  @Column('float', { name: 'fee' })
  fee!: number

  @Column('float', { name: 'price' })
  price!: number

  @Column('char', { name: 'product_uuid', length: 36 })
  productUuid!: string

  @ManyToOne(() => ProductEntity, (product) => product.variants)
  @JoinColumn({ name: 'product_uuid', referencedColumnName: 'uuid' })
  product!: ProductEntity

  @OneToOne(() => ImageEntity, (image) => image.variantUuid)
  image!: ImageEntity

  @OneToMany(() => CartEntity, (cart) => cart.variant)
  carts!: CartEntity[]
}
export default VariantEntity
