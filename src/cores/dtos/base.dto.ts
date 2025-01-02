import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'

import { IBaseDate, IBaseId, IBaseName, IBaseUuid } from '~/cores/interfaces'

import { MAX_VARCHAR_LENGTH } from '../constants'

export class BaseErrorDto {
  @ApiProperty()
  @IsString()
  public code!: string

  @ApiProperty()
  @IsString()
  public desc!: string
}

export class BaseResDto {
  @ApiProperty({
    example: HttpStatus.OK,
    enum: HttpStatus,
  })
  @IsEnum(HttpStatus, {
    message: 'statusCode must be a valid HTTP status code',
  })
  public statusCode!: HttpStatus

  @ApiProperty({
    example: 'Success',
  })
  @IsOptional()
  @IsString()
  public message!: string | null

  @ApiProperty({
    example: null,
  })
  @IsOptional()
  @Type(() => BaseErrorDto)
  public errors!: BaseErrorDto | null
}

export class BaseIdDto implements IBaseId {
  @ApiProperty({ example: 5 })
  @IsNumberString({}, { message: 'ID must be a number' })
  public id!: number
}

export class BaseUuidDto implements IBaseUuid {
  @ApiProperty({ example: '2bb5f8b6-c59f-487c-a8b4-d3ac9bec7916' })
  @IsUUID('all', { message: 'ID must be a UUID' })
  public uuid!: string
}

export class BaseDateDto implements IBaseDate {
  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsDateString({}, { message: 'createdAt must be a date' })
  public createdAt!: Date

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsDateString({}, { message: 'updatedAt must be a date' })
  public updatedAt!: Date
}

export class BaseNameDto implements IBaseName {
  @ApiProperty({ example: 'Category one' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(MAX_VARCHAR_LENGTH, { message: 'Name is too long' })
  public name!: string

  @ApiProperty({ example: 'category-one' })
  @IsString({ message: 'Slug must be a string' })
  public slug!: string
}
