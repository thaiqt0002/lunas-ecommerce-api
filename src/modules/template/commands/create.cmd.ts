import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ICreateTemplateParams } from '~/cores/interfaces'
import { LayoutRepo, TemplateRepo } from '~/cores/repo'

import { CreateTemplateDto } from '../template.dto'

export default class CreateTemplateCmd extends CreateTemplateDto implements ICommand {
  public constructor(options: ICreateTemplateParams) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(CreateTemplateCmd)
export class CreateTemplateHldr implements ICommandHandler<ICreateTemplateParams> {
  constructor(
    private readonly repo: TemplateRepo,
    private readonly layoutRepo: LayoutRepo,
  ) {}
  async execute(command: ICreateTemplateParams): Promise<void> {
    await this.checkLayoutExist(command.layoutId)
    await this.create(command)
  }
  private async create(data: ICreateTemplateParams) {
    const hasActiveTemplate = await this.repo.findOne({ where: { page: data.page, isActive: true } })
    //eslint-disable-next-line
    const { isActive, ...newData } = data
    const newTemplate = this.repo.create({ ...newData, isActive: !hasActiveTemplate })
    await this.repo.save(newTemplate)
  }
  private async checkLayoutExist(layoutId: number) {
    const layout = await this.layoutRepo.findOneById(layoutId)
    if (!layout) {
      throw new RpcException(ERRORS.LAYOUT_NOT_FOUND)
    }
  }
}
