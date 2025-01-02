import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { BaseUuidDto } from '~/cores/dtos'
import { IBaseBrand } from '~/cores/interfaces/brand.interface'

class BrandBaseDto extends BaseUuidDto implements IBaseBrand {
  @ApiProperty({
    description: 'Name of the brand',
    example: 'Mihoyo',
  })
  @IsString({ message: 'Name must be a string' })
  name!: string
}

export class CreateBrandDto extends OmitType(BrandBaseDto, ['uuid']) {}
