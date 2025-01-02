import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { IUpdateTemplateParams } from '~/cores/interfaces'
import { LayoutRepo, TemplateRepo } from '~/cores/repo'

import { UpdateTemplateDto } from '../template.dto'

export default class UpdateTemplateCmd extends UpdateTemplateDto implements ICommand {
  public constructor(options: IUpdateTemplateParams) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(UpdateTemplateCmd)
export class UpdateTemplateHldr implements ICommandHandler<IUpdateTemplateParams> {
  constructor(
    private readonly repo: TemplateRepo,
    private readonly layoutRepo: LayoutRepo,
  ) {}
  async execute(command: IUpdateTemplateParams): Promise<void> {
    await this.checkLayoutExist(command.layoutId)
    await this.update(command)
  }

  private async update(data: IUpdateTemplateParams) {
    const { id, ...updateData } = data
    const template = await this.repo.findOneById(id)
    if (!template) {
      throw new RpcException(ERRORS.TEMPLATE_NOT_FOUND)
    }
    if (updateData.isActive) {
      const hasActiveTemplate = await this.repo.findOne({ where: { page: updateData.page, isActive: true } })
      if (hasActiveTemplate && hasActiveTemplate.id !== id) {
        hasActiveTemplate.isActive = false
        await this.repo.save(hasActiveTemplate)
      }
    }

    Object.assign(template, updateData)
    await this.repo.save(template)
  }
  private async checkLayoutExist(layoutId: number) {
    const layout = await this.layoutRepo.findOneById(layoutId)
    if (!layout) {
      throw new RpcException(ERRORS.LAYOUT_NOT_FOUND)
    }
  }
}
