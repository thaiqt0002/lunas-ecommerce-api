import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import VariantEntity from './variant.entity'

@Entity({ name: 'Cart' })
class CartEntity {
  @PrimaryColumn('char', { name: 'uuid', length: 36 })
  uuid!: string

  @Column('int', { name: 'quantity' })
  quantity!: number

  @Column('timestamp', { name: 'created_at' })
  createdAt!: Date

  @Column('char', { name: 'variant_uuid', length: 36 })
  variantUuid!: string

  @Column('timestamp', { name: 'updated_at' })
  updatedAt!: Date

  @ManyToOne(() => VariantEntity, (variant) => variant.carts)
  @JoinColumn({ name: 'variant_uuid', referencedColumnName: 'uuid' })
  variant!: VariantEntity

  @BeforeInsert()
  public insertDates() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  public updateDates() {
    this.updatedAt = new Date()
  }
}
export default CartEntity
