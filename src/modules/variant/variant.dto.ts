import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, ValidateNested } from 'class-validator'

import { MAX_VARCHAR_LENGTH } from '~/cores/constants'
import { BaseUuidDto } from '~/cores/dtos'
import { IBaseVariant } from '~/cores/interfaces/variant.interface'

class VariantBaseDto extends BaseUuidDto implements IBaseVariant {
  @ApiProperty({ example: 'Variant one' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Name is too long' })
  public name!: string

  @ApiProperty({ example: 10_000 })
  @IsNumber({}, { message: 'Fee must be a number' })
  @IsNotEmpty({ message: 'Fee is required' })
  public fee!: number

  @ApiProperty({ example: 100_000 })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  public price!: number
}

export class CreateVariantDto {
  @ApiProperty({ example: '2bb5f8b6-c59f-487c-a8b4-d3ac9bec7915' })
  @IsUUID('all', { message: 'Product must be a UUID' })
  @IsNotEmpty({ message: 'Product is required' })
  public productUuid!: string

  @ApiProperty({
    example: [
      {
        name: 'Variant one',
        fee: 10_000,
        uuid: '75477b65-89c3-4c39-8406-be4bf11b7831',
      },
    ],
  })
  @IsArray({ message: 'Variant must be an array' })
  @ValidateNested({ each: true })
  @Type(() => VariantBaseDto)
  public variants!: VariantBaseDto[]
}
