import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsArray, IsDateString, IsNumber, IsNumberString, IsOptional, IsString, IsUUID, Min } from 'class-validator'

import { BaseDateDto, BaseNameDto, BaseUuidDto } from '~/cores/dtos'
import { IBaseProduct } from '~/cores/interfaces'

class ProductBaseDto extends IntersectionType(BaseUuidDto, BaseDateDto, BaseNameDto) implements IBaseProduct {
  @ApiProperty({
    description: 'Description of the series',
    example: 'The Witcher is a fantasy drama series',
  })
  @IsString({ message: 'Description must be a string' })
  description!: string

  @ApiProperty({
    description: 'The origin price of the product',
    example: 100_000,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  originalPrice!: number

  @ApiProperty({
    description: 'The origin price of the product',
    example: 100_000,
  })
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  salePrice!: number

  @ApiProperty({ description: 'The quantity of the product', example: 100 })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @Min(0, { message: 'Quantity must be greater than or equal to 0' })
  quantity!: number

  @ApiProperty({
    description: 'The country of the product',
    example: 'Vietnam',
  })
  @IsString({ message: 'Country must be a string' })
  country!: string

  @ApiProperty({ description: 'Status of the product', example: 'Pre-order' })
  @IsString({ message: 'Status must be a string' })
  status!: string

  @ApiProperty({
    description: 'The thumbnail of the product',
    example: 'https://example.com/image.jpg',
  })
  @IsString({ message: 'Thumbnail must be a string' })
  thumbnail!: string

  @ApiProperty({ description: 'The priority of the product', example: 1 })
  @IsNumber({}, { message: 'Priority must be a number' })
  priority!: number

  @ApiProperty({
    description: 'The category of the product',
    example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f',
  })
  @IsUUID('all', { message: 'Parent Category must be a UUID' })
  @IsOptional()
  parentCategoryUuid!: string

  @ApiProperty({
    description: 'The category of the product',
    example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f',
  })
  @IsUUID('all', { message: 'Sub Category must be a UUID' })
  @IsOptional()
  subCategoryUuid!: string

  @ApiProperty({
    description: 'The category of the product',
    example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f',
  })
  @IsUUID('all', { message: 'Series must be a UUID' })
  @IsOptional()
  seriesUuid?: string

  @ApiProperty({ example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f,2f2f2f-2f2f-2f2f-2f2f2f2f' })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  @IsUUID('all', { each: true, message: 'Each brand UUID must be a valid UUID' })
  @IsOptional()
  brandUuid?: string

  @ApiProperty({ description: 'The exchange rate id', example: 1 })
  @IsNumber({}, { message: 'Exchange rate id must be a number' })
  @IsOptional()
  exchangeRateId?: number

  @ApiProperty({
    description: 'The start date of pre-order',
    example: '2021-01-01',
  })
  @IsDateString()
  @IsOptional()
  preorderStartDate?: Date

  @ApiProperty({
    description: 'The end date of pre-order',
    example: '2021-01-01',
  })
  @IsDateString()
  @IsOptional()
  preorderEndDate?: Date

  @IsDateString()
  @IsOptional()
  public releaseDate?: Date
}

export class CreateProductDto extends OmitType(ProductBaseDto, ['slug', 'createdAt', 'updatedAt', 'thumbnail']) {
  @ApiProperty({
    example: [1],
  })
  @IsOptional()
  @IsArray({ message: 'Tags must be array' })
  @IsNumber({}, { each: true })
  public tags?: number[]

  @ApiProperty({
    example: ['f9cba8f1-e108-48e8-8547-faa34aa0d2b4'],
  })
  @IsArray({ message: 'Images must be array' })
  @IsUUID('all', { each: true, message: 'Image must be a UUID' })
  public images!: string[]
}

export class SearchProductDto {
  @IsOptional()
  @IsNumberString()
  minPrice!: number

  @IsOptional()
  @IsNumberString()
  maxPrice!: number

  @IsOptional()
  @IsString()
  search!: string

  @IsOptional()
  @IsNumber()
  created!: number

  @IsOptional()
  @IsNumberString()
  updated!: number

  @IsOptional()
  @IsNumberString()
  price!: number

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @IsUUID('all', { each: true })
  brandUuid!: string[]
}

export class GetProductByVariantDto {
  @ApiProperty({
    description: 'The variant of the product',
    example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f',
  })
  @IsUUID('all', { message: 'Variant must be a UUID' })
  variantUuid!: string

  @ApiProperty({
    description: 'The number of product',
    example: 3,
  })
  @IsNumber()
  quantity!: number

  @ApiProperty({
    description: 'The variant of the product',
    example: '1f1f1f1f-1f1f-1f1f-1f1f1f1f',
  })
  @IsUUID('all', { message: 'Cart must be a UUID' })
  cartUuid!: string

  @IsDateString()
  cartCreatedAt!: Date
}

export class SearchKeywordProductDto {
  @ApiProperty({
    description: 'The keyword for searching',
    example: 'abcdef',
  })
  @IsString()
  keyword!: string
}
