import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { IBaseSeries } from '~/cores/interfaces'

import ProductEntity from './product.entity'

@Entity({ name: 'Series' })
class SeriesEntity implements IBaseSeries {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar', { name: 'name', length: 255 })
  name!: string

  @Column('varchar', { name: 'slug', length: 255 })
  slug!: string

  @Column('text', { name: 'description' })
  description!: string

  @Column('varchar', { name: 'image', length: 255 })
  image!: string

  @Column('int', { name: 'product_total', default: 0 })
  productTotal!: number

  @Column('timestamp', { name: 'created_at' })
  createdAt!: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt!: Date

  @OneToMany(() => ProductEntity, (product) => product.series)
  products!: ProductEntity[]

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
export default SeriesEntity
