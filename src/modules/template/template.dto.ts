import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

import { MAX_VARCHAR_LENGTH } from '~/cores/constants'
import { BaseIdDto } from '~/cores/dtos'
import { IBaseTemplate } from '~/cores/interfaces'

class BaseTemplateDto extends IntersectionType(BaseIdDto) implements IBaseTemplate {
  @ApiProperty({ example: 'homepage' })
  @IsString({ message: 'Page must be a string' })
  @IsNotEmpty({ message: 'Page is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Page is too long' })
  public page!: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Priority must be a number' })
  @IsNotEmpty({ message: 'Priority is required' })
  public priority!: number

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'isActive is required' })
  public isActive!: boolean

  @ApiProperty({ example: "{data: ['1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f']}" })
  @IsString({ message: 'Attributes must be a string' })
  @IsNotEmpty({ message: 'Attributes is required' })
  public attributes!: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'LayoutId must be a number' })
  @IsNotEmpty({ message: 'LayoutId is required' })
  public layoutId!: number
}

export class CreateTemplateDto extends OmitType(BaseTemplateDto, ['id'] as const) {}

export class UpdateTemplateDto extends IntersectionType(BaseIdDto) {
  @ApiProperty({ example: 'homepage' })
  @IsString({ message: 'Page must be a string' })
  @IsNotEmpty({ message: 'Page is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Page is too long' })
  public page!: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'Priority must be a number' })
  @IsOptional()
  public priority?: number

  @ApiProperty({ example: true })
  @IsNotEmpty({ message: 'isActive is required' })
  public isActive!: boolean

  @ApiProperty({ example: "{data: ['1f1f1f1f-1f1f-1f1f-1f1f-1f1f1f1f']}" })
  @IsString({ message: 'Attributes must be a string' })
  @IsNotEmpty({ message: 'Attributes is required' })
  @IsOptional()
  public attributes!: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: 'LayoutId must be a number' })
  @IsNotEmpty({ message: 'LayoutId is required' })
  public layoutId!: number
}

export class DeleteTemplateDto extends PickType(BaseIdDto, ['id']) {}

export class GetTemplateDto extends PickType(BaseTemplateDto, ['page']) {}
