import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

import { MAX_VARCHAR_LENGTH } from '~/cores/constants'
import { BaseIdDto } from '~/cores/dtos'
import { IBaseLayout } from '~/cores/interfaces'

class BaseLayoutDto extends IntersectionType(BaseIdDto) implements IBaseLayout {
  @ApiProperty({ example: 'List Best Seller Product' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Name is too long' })
  public name!: string

  @ApiProperty({ example: 'https://example.com' })
  @IsString({ message: 'Example must be a string' })
  @IsNotEmpty({ message: 'Example is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Example is too long' })
  public exampleImage!: string

  @ApiProperty({ example: "{data: ['1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f']}" })
  @IsString({ message: 'Example must be a string' })
  @IsNotEmpty({ message: 'Example is required' })
  public exampleData!: string
}

export class CreateLayoutDto extends OmitType(BaseLayoutDto, ['id', 'exampleImage']) {}

export class DeleteLayoutDto extends IntersectionType(BaseIdDto) {}
