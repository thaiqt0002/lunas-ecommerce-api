import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseUuidDto } from '~/cores/dtos'
import { IDeleteCategoryParams, Prettify } from '~/cores/interfaces'
import { CategoryRepo } from '~/cores/repo'

export default class DeleteCategoryCmd extends BaseUuidDto implements ICommand {
  constructor(options: IDeleteCategoryParams) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(DeleteCategoryCmd)
export class DeleteCategoryHlr implements ICommandHandler<IDeleteCategoryParams> {
  private async checkExisting(uuid: string): Promise<boolean> {
    const category = await this.repo.findOne({
      where: { uuid },
    })
    if (!category) {
      throw new RpcException(ERRORS.CATEGORY_NOT_FOUND)
    }
    return true
  }

  constructor(private readonly repo: CategoryRepo) {}

  public async execute({ uuid }: Prettify<IDeleteCategoryParams>) {
    await this.checkExisting(uuid)
    await this.repo.deleteByUuid(uuid)
  }
}
