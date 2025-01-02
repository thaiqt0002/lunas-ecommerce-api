import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { IsOptional, IsString, IsUUID } from 'class-validator'

import { BaseDateDto, BaseNameDto, BaseUuidDto } from '~/cores/dtos'
import { IBaseCategory, IDeleteCategoryParams, IFindAllCategoriesRes } from '~/cores/interfaces'

class BaseCategoryDto extends IntersectionType(BaseUuidDto, BaseDateDto, BaseNameDto) implements IBaseCategory {
  @ApiProperty({
    description: 'Description of the series',
    example: 'The Witcher is a fantasy drama series',
  })
  @IsString({ message: 'Description must be a string' })
  description!: string

  @ApiProperty({
    description: 'parent UUID of the series',
    example: '2bb5f8b6-c59f-487c-a8b4-d3ac9bec7916',
  })
  @IsUUID('all', { message: 'Parent UUID must be a UUID' })
  @IsOptional()
  parentUuid!: string | null
}

export class CreateCategoryParamsDto extends PickType(BaseCategoryDto, ['name', 'description', 'parentUuid']) {}

export class FindAllCategoriesResDto extends BaseCategoryDto implements IFindAllCategoriesRes {
  @ApiProperty({
    description: 'Sub categories of the series',
    type: [FindAllCategoriesResDto],
    example: [
      {
        uuid: '2bb5f8b6-c59f-487c-a8b4-d3ac9bec7916',
        name: 'The Witcher',
        slug: 'the-witcher',
        description: 'The Witcher is a fantasy drama series',
        createdAt: '2021-10-08T00:00:00.000Z',
        updatedAt: '2021-10-08T00:00:00.000Z',
      },
    ],
  })
  sub!: Omit<IFindAllCategoriesRes, 'sub'>[]
}

export class DeleteCategoryParamsDto extends BaseUuidDto implements IDeleteCategoryParams {}
