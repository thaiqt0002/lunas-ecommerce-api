import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IsNull } from 'typeorm'

import { IFindAllCategoriesRes } from '~/cores/interfaces'
import { CategoryRepo } from '~/cores/repo'

export default class FindAllCategoryQr implements IQuery {}

@QueryHandler(FindAllCategoryQr)
export class FindAllCategoryHlr implements IQueryHandler<FindAllCategoryQr> {
  constructor(private readonly repo: CategoryRepo) {}
  public async execute(): Promise<IFindAllCategoriesRes[]> {
    return await this.findAll()
  }

  private async findAll() {
    return await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        parentUuid: false,
        sub: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      where: {
        parentUuid: IsNull(),
      },
      relations: {
        sub: true,
      },
    })
  }
}
