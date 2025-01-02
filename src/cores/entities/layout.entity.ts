import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import TemplateEntity from './template.entity'
import { IBaseLayout } from '../interfaces'

@Entity({ name: 'Layout' })
class LayoutEntity implements IBaseLayout {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column('char', { name: 'name', length: 255 })
  name!: string

  @Column('text', { name: 'example_data' })
  exampleData!: string

  @Column('char', { name: 'example_image', length: 255 })
  exampleImage!: string

  @OneToMany(() => TemplateEntity, (template) => template.layout)
  templates!: TemplateEntity[]
}

export default LayoutEntity
