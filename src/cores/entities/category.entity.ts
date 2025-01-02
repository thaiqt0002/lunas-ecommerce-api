import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { IBaseCategory } from '~/cores/interfaces'

import ProductEntity from './product.entity'

@Entity({ name: 'Category' })
class CategoryEntity implements IBaseCategory {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid!: string

  @Column('varchar', { name: 'name', length: 255 })
  name!: string

  @Column('varchar', { name: 'slug', length: 255 })
  slug!: string

  @Column('text', { name: 'description' })
  description!: string

  @Column('timestamp', { name: 'created_at' })
  createdAt!: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt!: Date

  @Column('char', { name: 'parent_uuid', length: 36, nullable: true })
  parentUuid!: string | null

  @OneToOne(() => CategoryEntity, { nullable: true })
  @JoinColumn({ name: 'parent_uuid', referencedColumnName: 'uuid' })
  parent!: CategoryEntity

  @OneToMany(() => CategoryEntity, (category) => category.parent)
  @JoinColumn({ name: 'uuid', referencedColumnName: 'parent_uuid' })
  sub!: CategoryEntity[]

  @OneToMany(() => ProductEntity, (product) => product.parentCategory)
  productOfParent!: ProductEntity[]

  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  productOfSub!: ProductEntity[]

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
export default CategoryEntity
