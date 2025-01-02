import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseUuidDto } from '~/cores/dtos'
import { IDeleteProductParams, IDeleteVariantParams } from '~/cores/interfaces'
import { S3Serv } from '~/cores/modules/S3'
import { ImageRepo, VariantRepo } from '~/cores/repo'

class DeleteVariantCmd extends BaseUuidDto implements ICommand {
  uuid!: string
  public constructor({ uuid }: IDeleteVariantParams) {
    super()
    this.uuid = uuid
  }
}
@CommandHandler(DeleteVariantCmd)
export class DeleteVariantHdlr implements ICommandHandler<IDeleteVariantParams> {
  public constructor(
    private readonly repo: VariantRepo,
    private readonly s3: S3Serv,
    private readonly imageRepo: ImageRepo,
  ) {}

  public async execute({ uuid }: IDeleteProductParams): Promise<void> {
    const variant = await this.delete(uuid)
    await this.deleteImage(variant)
  }

  private async delete(uuid: string): Promise<{ variantUuid: string; productUuid: string }> {
    const variant = await this.repo.findOneByUuid(uuid)
    if (!variant) {
      throw new RpcException(ERRORS.VARIANT_NOT_FOUND)
    }
    await this.repo.deleteByUuid(uuid)
    return { variantUuid: variant.uuid, productUuid: variant.productUuid }
  }

  private async deleteImage(variant: { variantUuid: string; productUuid: string }): Promise<void> {
    const image = await this.imageRepo.findOne({
      where: {
        productUuid: variant.productUuid,
        variantUuid: variant.variantUuid,
      },
    })
    if (!image) {
      return
    }
    await this.s3.deleteObject([{ Key: image.imageUrl }])
  }
}
