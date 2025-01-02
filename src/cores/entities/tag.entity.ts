import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { IBaseTag } from '~/cores/interfaces'

import { ProductEntity, ProductTagEntity } from '.'

@Entity('Tag')
class TagEntity implements IBaseTag {
  @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
  id!: number

  @Column('varchar', { name: 'name', length: 50 })
  name!: string

  @ManyToOne(() => ProductTagEntity, (productTag) => productTag.tagId)
  @JoinColumn({ name: 'id', referencedColumnName: 'tagId' })
  productTags!: ProductTagEntity[]

  @ManyToMany(() => ProductTagEntity, (product) => product.tags)
  @JoinTable()
  products!: ProductEntity[]
}
export default TagEntity
