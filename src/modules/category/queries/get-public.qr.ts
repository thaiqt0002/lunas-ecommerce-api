import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { IsNull } from 'typeorm'

import { CategoryEntity } from '~/cores/entities'
import { CategoryRepo } from '~/cores/repo'

export default class GetPublicCategoriesQr implements IQuery {}

@QueryHandler(GetPublicCategoriesQr)
export class GetPublicCategoriesHlr implements IQueryHandler<GetPublicCategoriesQr> {
  constructor(private readonly repo: CategoryRepo) {}
  public async execute(): Promise<CategoryEntity[]> {
    return await this.getPublic()
  }
  private getPublic() {
    return this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        slug: true,
        description: true,
        sub: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
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
