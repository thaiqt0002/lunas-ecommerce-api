import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import ProductEntity from './product.entity'
import { IBaseBrand } from '../interfaces/brand.interface'

@Entity({ name: 'Brands' })
class BrandEntity implements IBaseBrand {
  @PrimaryColumn('char', { name: 'uuid', length: 36 })
  uuid!: string

  @Column('varchar', { name: 'name', length: 255 })
  name!: string

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products!: ProductEntity[]
}
export default BrandEntity
