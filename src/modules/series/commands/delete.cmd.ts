import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseUuidDto } from '~/cores/dtos'
import { S3Serv } from '~/cores/modules/S3'
import { SeriesRepo } from '~/cores/repo'

export default class DeleteSeriesCmd extends BaseUuidDto implements ICommand {
  constructor({ uuid }: BaseUuidDto) {
    super()
    this.uuid = uuid
  }
}

@CommandHandler(DeleteSeriesCmd)
export class DeleteSeriesHandler implements ICommandHandler<DeleteSeriesCmd> {
  constructor(
    private readonly repo: SeriesRepo,
    private readonly s3: S3Serv,
  ) {}

  public async execute({ uuid }: DeleteSeriesCmd) {
    await this.checkExisting(uuid)
    await this.deleteImage(uuid)
    await this.delete(uuid)
  }

  private async checkExisting(uuid: string): Promise<boolean> {
    const series = await this.repo.findOne({
      where: { uuid },
    })
    if (!series) {
      throw new RpcException(ERRORS.SERIES_NOT_FOUND)
    }
    return true
  }

  private async delete(uuid: string) {
    await this.repo.deleteByUuid(uuid)
  }

  private async deleteImage(uuid: string) {
    const series = await this.repo.findOneByUuid(uuid)
    if (!series) {
      return
    }
    const { image } = series
    await this.s3.deleteObject([{ Key: image }])
  }
}
