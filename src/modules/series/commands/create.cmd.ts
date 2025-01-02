import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ICreateSeries, Prettify } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper/helper.serv'
import { S3Serv } from '~/cores/modules/S3/s3.serv'
import { SeriesRepo } from '~/cores/repo'

import { CreateSeriesDto } from '../series.dto'

export default class CreateSeriesCmd extends CreateSeriesDto implements ICommand {
  name!: string
  description!: string
  constructor(otps: Prettify<ICreateSeries>) {
    const { name, description } = otps
    super(otps)
    this.name = name
    this.description = description
  }
}

@CommandHandler(CreateSeriesCmd)
export class CreateSeriesHandler implements ICommandHandler<CreateSeriesCmd> {
  constructor(
    private readonly repo: SeriesRepo,
    private readonly helper: HelperServ,
    private readonly s3: S3Serv,
  ) {}
  public async execute(cmd: CreateSeriesCmd): Promise<string> {
    const { name } = cmd
    await this.checkExistingSeries(name)
    await this.create(cmd)
    return await this.getPreSignedUrl(name)
  }

  private async checkExistingSeries(name: string): Promise<boolean> {
    const existingSeries = await this.repo.findOne({
      where: { name },
    })
    if (existingSeries) {
      throw new RpcException(ERRORS.SERIES_ALREADY_EXISTS)
    }
    return true
  }

  private async create(params: ICreateSeries) {
    const slug = this.helper.slugify(params.name)
    const image = `series/${slug}.webp`
    const series = this.repo.create({
      ...params,
      slug,
      image,
    })
    await this.repo.save(series)
  }

  private async getPreSignedUrl(name: string): Promise<string> {
    const slug = this.helper.slugify(name)
    const key = `series/${slug}.webp`
    return await this.s3.getPreSignedUrl(key)
  }
}
