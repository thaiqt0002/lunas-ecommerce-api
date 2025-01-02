import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ICreateLayoutParams } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper'
import { S3Serv } from '~/cores/modules/S3'
import { LayoutRepo } from '~/cores/repo'

import { CreateLayoutDto } from '../layout.dto'

export default class CreateLayoutCmd extends CreateLayoutDto implements ICommand {
  public constructor(options: ICreateLayoutParams) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(CreateLayoutCmd)
export class CreateLayoutHldr implements ICommandHandler<ICreateLayoutParams> {
  constructor(
    private readonly repo: LayoutRepo,
    private readonly s3: S3Serv,
    private readonly helper: HelperServ,
  ) {}
  async execute(command: ICreateLayoutParams): Promise<string> {
    await this.validate(command)
    const key = await this.create(command)
    return await this.getPreSignedUrl(key)
  }
  private async validate(command: ICreateLayoutParams): Promise<void> {
    const layout = await this.repo.findOne({ where: { name: command.name } })
    if (layout) {
      throw new RpcException(ERRORS.LAYOUT_EXIST_NAME)
    }
  }
  private async create(data: ICreateLayoutParams): Promise<string> {
    const slug = this.helper.slugify(data.name)
    const key = `layouts/${slug}.webp`
    const newLayout = this.repo.create({ ...data, exampleImage: key })
    await this.repo.save(newLayout)
    return key
  }

  private async getPreSignedUrl(key: string): Promise<string> {
    return await this.s3.getPreSignedUrl(key)
  }
}
