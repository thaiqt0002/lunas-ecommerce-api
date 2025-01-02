import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

import BrandEntity from './brand.entity'
import CategoryEntity from './category.entity'
import ExchangeRateEntity from './exchange-rate.entity'
import ImageEntity from './image.entity'
import ProductImageEntity from './productImage.entity'
import SeriesEntity from './series.entity'
import TagEntity from './tag.entity'
import VariantEntity from './variant.entity'
import { IBaseProduct } from '../interfaces'

@Entity({ name: 'Product' })
class ProductEntity implements IBaseProduct {
  @PrimaryColumn({ type: 'char', length: 36, name: 'uuid' })
  uuid!: string

  @Column('varchar', { name: 'name', length: 255 })
  name!: string

  @Column('varchar', { name: 'slug', length: 255 })
  slug!: string

  @Column('text', { name: 'description' })
  description!: string

  @Column('float', { name: 'original_price' })
  originalPrice!: number

  @Column('float', { name: 'sale_price' })
  salePrice!: number

  @Column('int', { name: 'quantity' })
  quantity!: number

  @Column('varchar', { name: 'thumbnail', length: 255 })
  thumbnail!: string

  @Column('varchar', { name: 'country', length: 255 })
  country!: string

  @Column('varchar', { name: 'status', length: 50 })
  status!: string

  @Column('int', { name: 'priority' })
  priority!: number

  @Column('char', { name: 'parent_category_uuid', length: 36, nullable: true })
  parentCategoryUuid!: string

  @Column('char', { name: 'sub_category_uuid', length: 36, nullable: true })
  subCategoryUuid!: string

  @Column('char', { name: 'series_uuid', length: 36, nullable: true })
  seriesUuid!: string
  @Column('char', { name: 'brand_uuid', length: 36, nullable: true })
  brandUuid!: string

  @Column('timestamp', { name: 'preorder_start_date' })
  preorderStartDate!: Date

  @Column('timestamp', { name: 'preorder_end_date' })
  preorderEndDate!: Date

  @Column('timestamp', { name: 'release_date' })
  releaseDate!: Date

  @Column('timestamp', { name: 'created_at' })
  createdAt!: Date

  @Column('timestamp', { name: 'updated_at' })
  updatedAt!: Date

  @Column('timestamp', { name: 'delete_at' })
  deletedAt!: Date

  @ManyToOne(() => CategoryEntity, (category) => category.uuid)
  @JoinColumn({ name: 'parent_category_uuid', referencedColumnName: 'uuid' })
  parentCategory!: CategoryEntity

  @ManyToOne(() => CategoryEntity, (category) => category.uuid)
  @JoinColumn({ name: 'sub_category_uuid', referencedColumnName: 'uuid' })
  subCategory!: CategoryEntity

  @ManyToOne(() => ExchangeRateEntity, (exchangeRate) => exchangeRate.products)
  @JoinColumn({ name: 'exchange_rate_id', referencedColumnName: 'id' })
  exchangeRate!: ExchangeRateEntity

  @ManyToOne(() => SeriesEntity, (series) => series.products)
  @JoinColumn({ name: 'series_uuid', referencedColumnName: 'uuid' })
  series!: SeriesEntity
  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  @JoinColumn({ name: 'brand_uuid', referencedColumnName: 'uuid' })
  brand!: BrandEntity

  @OneToMany(() => VariantEntity, (variant) => variant.product)
  variants!: VariantEntity[]

  @OneToMany(() => ImageEntity, (image) => image.productUuid)
  images!: ImageEntity[]

  @OneToMany(() => ProductImageEntity, (image) => image.product)
  productImages!: ProductImageEntity[]

  @ManyToMany(() => TagEntity, (tag) => tag.products)
  @JoinTable({
    name: 'ProductTag',
    joinColumn: { name: 'product_uuid', referencedColumnName: 'uuid' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags!: TagEntity[]

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

export default ProductEntity
