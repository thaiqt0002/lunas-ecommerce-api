import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { In } from 'typeorm'

import { ERRORS } from '~/cores/constants'
import { ProductEntity } from '~/cores/entities'
import { IBaseVariant, ICreateVariantParams } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper'
import { S3Serv } from '~/cores/modules/S3'
import { ImageRepo, ProductRepo, VariantRepo } from '~/cores/repo'

import { CreateVariantDto } from '../variant.dto'

export default class CreateVariantCmd extends CreateVariantDto implements ICommand {
  public constructor(options: ICreateVariantParams) {
    super()
    Object.assign(this, options)
  }
}

@CommandHandler(CreateVariantCmd)
export class CreateVariantHdlr implements ICommandHandler<ICreateVariantParams> {
  public constructor(
    private readonly repo: VariantRepo,
    private readonly s3: S3Serv,
    private readonly productRepo: ProductRepo,
    private readonly helper: HelperServ,
    private readonly imageRepo: ImageRepo,
  ) {}
  public async execute(command: ICreateVariantParams): Promise<{ presignedUrl: string; uuid: string }[]> {
    await this.validate(command)
    return await this.create(command)
  }

  private async validate(command: ICreateVariantParams): Promise<void> {
    const { productUuid, variants } = command
    const nameList = variants.map(({ name }) => name)
    const product = await this.checkExistProduct(productUuid)
    await this.checkExistVariantName(product, nameList)
  }
  private async checkExistProduct(productUuid: string): Promise<ProductEntity> {
    const product = await this.productRepo.findOneByUuid(productUuid)
    if (!product) {
      throw new RpcException(ERRORS.PRODUCT_NOT_FOUND)
    }
    return product
  }
  private async checkExistVariantName(product: ProductEntity, listName: string[]): Promise<void> {
    const existVariants = await this.repo.findOne({
      where: {
        productUuid: product.uuid,
        name: In(listName),
      },
    })
    if (existVariants) {
      throw new RpcException(ERRORS.VARIANT_ALREADY_EXISTS)
    }
  }

  private async create(data: ICreateVariantParams) {
    const { productUuid, variants } = data
    const product = await this.productRepo.findOneByUuid(productUuid)
    return await Promise.all(
      variants.map(async (variant) => {
        const newVariant = this.repo.create({ ...variant, productUuid })
        await this.repo.save(newVariant)
        if (product === null) {
          throw new RpcException(ERRORS.PRODUCT_NOT_FOUND)
        }
        const key = await this.createImages(product, variant)
        const presignedUrl = await this.getPreSignedUrl(key)
        return { presignedUrl, uuid: newVariant.uuid }
      }),
    )
  }

  private async createImages(
    { uuid: productUuid, name: productName }: ProductEntity,
    { uuid: variantUuid, name: variantName }: IBaseVariant,
  ): Promise<string> {
    const slug = this.helper.slugify(`${productName} ${variantName}`)
    const key = `products/${slug}.webp`
    const image = this.imageRepo.create({
      imageUrl: key,
      productUuid,
      variantUuid,
    })
    await this.imageRepo.save(image)
    return key
  }

  private async getPreSignedUrl(key: string): Promise<string> {
    return await this.s3.getPreSignedUrl(key)
  }
}
