import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { IBaseExchanegRate } from '~/cores/interfaces'

import ProductEntity from './product.entity'

@Entity({ name: 'ExchangeRate' })
class ExchangeRateEntity implements IBaseExchanegRate {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id!: number

  @Column('varchar', { name: 'currency', length: 255 })
  currency!: string

  @Column('float', { name: 'rate' })
  rate!: number

  @OneToMany(() => ProductEntity, (product) => product.exchangeRate)
  products!: ProductEntity[]
}
export default ExchangeRateEntity
