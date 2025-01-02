import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

import { BaseIdDto } from '~/cores/dtos'
import { ICreateExchangeRateParams } from '~/cores/interfaces'

class BaseExchangeRateDto extends IntersectionType(BaseIdDto) {
  @ApiProperty()
  @IsString()
  currency!: string

  @ApiProperty()
  @IsNumber()
  rate!: number
}

export class CreateExchangeRateParamsDto
  extends PickType(BaseExchangeRateDto, ['currency', 'rate'])
  implements ICreateExchangeRateParams {}
