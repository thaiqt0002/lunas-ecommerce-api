import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString, IsUrl } from 'class-validator'

import { BaseDateDto, BaseNameDto, BaseUuidDto } from '~/cores/dtos'
import { IBaseSeries, ICreateSeries } from '~/cores/interfaces'

class BaseSeriesDto extends IntersectionType(BaseUuidDto, BaseDateDto, BaseNameDto) implements IBaseSeries {
  @ApiProperty({
    description: 'Description of the series',
    example: 'The Witcher is a fantasy drama series',
  })
  @IsString({ message: 'Description must be a string' })
  description!: string

  @ApiProperty({
    description: 'Image of the series',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl({}, { message: 'Image must be a URL' })
  image!: string

  @ApiProperty({
    description: 'Count of Series Product',
    example: 15,
  })
  @IsNumber()
  productTotal!: number
}

export class CreateSeriesDto extends PickType(BaseSeriesDto, ['name', 'description']) implements ICreateSeries {}

export class DeleteSeriesParamsDto extends IntersectionType(BaseUuidDto) {}

export class SearchKeywordSeriesDto {
  @ApiProperty({
    description: 'The keyword for searching',
    example: 'abcdef',
  })
  @IsString()
  keyword!: string
}
