import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ICreateCategoryParams } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper'
import { CategoryRepo } from '~/cores/repo'

import { CreateCategoryParamsDto } from '../category.dto'

export default class CreateCategoryCmd extends CreateCategoryParamsDto implements ICommand {
  constructor(options: ICreateCategoryParams) {
    const { name, description, parentUuid } = options
    super(options)
    this.name = name
    this.description = description
    this.parentUuid = parentUuid
  }
}

@CommandHandler(CreateCategoryCmd)
export class CreateCategoryHlr implements ICommandHandler<CreateCategoryCmd> {
  constructor(
    private readonly repo: CategoryRepo,
    private readonly helper: HelperServ,
  ) {}

  private async checkExisting(name: string): Promise<boolean> {
    const category = await this.repo.findOne({
      where: { name },
    })
    if (category) {
      throw new RpcException(ERRORS.CATEGORY_ALREADY_EXISTS)
    }
    return true
  }

  private async checkExistingParent(parentUuid: string | null): Promise<boolean> {
    if (!parentUuid) {
      return true
    }
    const parent = await this.repo.findOneByUuid(parentUuid)
    if (!parent) {
      throw new RpcException(ERRORS.CATEGORY_PARENT_NOT_FOUND)
    }
    return true
  }

  private async create(params: ICreateCategoryParams) {
    const slug = this.helper.slugify(params.name)
    const category = this.repo.create({
      ...params,
      slug,
    })
    await this.repo.save(category)
  }

  public async execute(cmd: CreateCategoryCmd) {
    const { name, parentUuid } = cmd
    await this.checkExisting(name)
    await this.checkExistingParent(parentUuid)
    await this.create(cmd)
  }
}
