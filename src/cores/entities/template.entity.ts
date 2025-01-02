import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import LayoutEntity from './layout.entity'
import { IBaseTemplate } from '../interfaces'

@Entity({ name: 'Template' })
class TemplateEntity implements IBaseTemplate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column('char', { name: 'page', length: 255 })
  page!: string

  @Column('int', { name: 'priority' })
  priority!: number

  @Column('tinyint', { name: 'is_active' })
  isActive!: boolean

  @Column('text', { name: 'attributes' })
  attributes!: string

  @Column('int', { name: 'layout_id' })
  layoutId!: number

  @ManyToOne(() => LayoutEntity, (layout) => layout.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'layout_id', referencedColumnName: 'id' })
  layout!: LayoutEntity
}

export default TemplateEntity
