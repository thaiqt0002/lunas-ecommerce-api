import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

import { ICreateManyTagParams } from '~/cores/interfaces'

export class CreateManyTagParamsDto implements ICreateManyTagParams {
  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  public names!: string[]
}
