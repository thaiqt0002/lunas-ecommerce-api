import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseIdDto } from '~/cores/dtos'
import { IDeleteLayoutParams } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper'
import { S3Serv } from '~/cores/modules/S3'
import { LayoutRepo } from '~/cores/repo'

export default class DeleteLayoutCmd extends BaseIdDto implements ICommand {
  constructor({ id }: IDeleteLayoutParams) {
    super()
    this.id = id
  }
}

@CommandHandler(DeleteLayoutCmd)
export class DeleteLayoutHdlr implements ICommandHandler<IDeleteLayoutParams> {
  constructor(
    private readonly repo: LayoutRepo,
    private readonly s3: S3Serv,
    private readonly helper: HelperServ,
  ) {}

  async execute(command: IDeleteLayoutParams): Promise<void> {
    const { id } = command
    await this.deleteImage(id)
    await this.deleteLayout(id)
  }
  private async deleteLayout(id: number) {
    return await this.repo.deleteById(id)
  }
  private async deleteImage(id: number) {
    const layout = await this.repo.findOneById(id)
    if (!layout) {
      throw new RpcException(ERRORS.LAYOUT_NOT_FOUND)
    }
    const key = `layouts/${this.helper.slugify(layout.name)}.webp`
    await this.s3.deleteObject([{ Key: key }])
  }
}
