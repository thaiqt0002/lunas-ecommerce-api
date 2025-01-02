import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { TemplateRepo } from '~/cores/repo'

export default class GetTemplateByPageQr implements IQuery {
  public page!: string
  constructor(page: string) {
    this.page = page
  }
}

@QueryHandler(GetTemplateByPageQr)
export class GetTemplateByPageHlr implements IQueryHandler<GetTemplateByPageQr> {
  constructor(private readonly repo: TemplateRepo) {}

  async execute(command: GetTemplateByPageQr) {
    const template = await this.repo.findOne({ where: { page: command.page, isActive: true } })
    if (!template) {
      throw new RpcException(ERRORS.TEMPLATE_NOT_FOUND)
    }
    const { attributes, ...templateWithoutAttributes } = template
    return { ...templateWithoutAttributes, data: JSON.parse(attributes) }
  }
}
