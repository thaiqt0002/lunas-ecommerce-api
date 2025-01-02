import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseUuidDto } from '~/cores/dtos'
import { IDeleteProductParams } from '~/cores/interfaces'
import { S3Serv } from '~/cores/modules/S3'
import { ImageRepo, ProductImageRepo, ProductRepo, SeriesRepo } from '~/cores/repo'

export default class DeleteProductCmd extends BaseUuidDto implements ICommand {
  constructor({ uuid }: IDeleteProductParams) {
    super()
    this.uuid = uuid
  }
}

@CommandHandler(DeleteProductCmd)
export class DeleteProductHdlr implements ICommandHandler<IDeleteProductParams> {
  constructor(
    private readonly repo: ProductRepo,
    private readonly s3: S3Serv,
    private readonly imageRepo: ImageRepo,
    private readonly productImageRepo: ProductImageRepo,
    private readonly seriesRepo: SeriesRepo,
  ) {}

  public async execute({ uuid }: IDeleteProductParams): Promise<void> {
    await this.decreaseSeriesProductCount(uuid)
    await this.deleteImages(uuid)
    await this.deleteThumbnail(uuid)
    await this.deleteVariantImage(uuid)
    await this.delete(uuid)
  }

  private async delete(uuid: string): Promise<void> {
    await this.repo.deleteByUuid(uuid)
  }

  private async deleteThumbnail(uuid: string): Promise<void> {
    const product = await this.repo.findOneByUuid(uuid)
    if (!product) {
      throw new RpcException(ERRORS.PRODUCT_NOT_FOUND)
    }
    await this.s3.deleteObject([{ Key: product.thumbnail }])
  }
  private async deleteImages(productUuid: string): Promise<void> {
    const images = await this.productImageRepo.findAll({ where: { productUuid } })
    if (images.length > 0) {
      const keys = images.map((image) => image.imageUrl)
      await this.deleteProductImages(keys)
    }
    await this.productImageRepo.deleteWithCondition({ productUuid })
  }

  private async deleteVariantImage(productUuid: string) {
    const images = await this.imageRepo.findAll({ where: { productUuid } })
    if (images.length > 0) {
      const keys = images.map((image) => ({ Key: image.imageUrl }))
      await this.s3.deleteObject(keys)
    }
  }
  private async deleteProductImages(key: string[]) {
    const keys = key.map((image) => ({ Key: image }))
    await this.s3.deleteObject(keys)
  }
  private async decreaseSeriesProductCount(uuid: string) {
    const product = await this.repo.findOne({ where: { uuid } })
    if (!product) return
    const series = await this.seriesRepo.findOne({ where: { uuid: product.seriesUuid } })
    if (!series) return
    series.productTotal -= 1
    await this.seriesRepo.save(series)
  }
}
