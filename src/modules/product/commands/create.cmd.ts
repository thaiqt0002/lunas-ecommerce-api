import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'
import { In } from 'typeorm'

import { ERRORS } from '~/cores/constants'
import { ProductImageEntity } from '~/cores/entities'
import { DeepPartial, ICreateProductParams, ICreateProductResponse, Prettify } from '~/cores/interfaces'
import { HelperServ } from '~/cores/modules/helper'
import { S3Serv } from '~/cores/modules/S3'
import {
  BrandRepo,
  CategoryRepo,
  ProductImageRepo,
  ProductRepo,
  ProductTagsRepo,
  SeriesRepo,
  TagRepo,
} from '~/cores/repo'
import ExchangeRatesRepo from '~/cores/repo/exchangeRates.repo'

import { CreateProductDto } from '../product.dto'

export default class CreateProductCmd extends CreateProductDto implements ICommand {
  constructor(options: ICreateProductParams) {
    super(options)
    Object.assign(this, options)
  }
}

@CommandHandler(CreateProductCmd)
export class CreateProductHdlr implements ICommandHandler<ICreateProductParams> {
  constructor(
    private readonly repo: ProductRepo,
    private readonly helper: HelperServ,
    private readonly s3: S3Serv,
    private readonly categoryRepo: CategoryRepo,
    private readonly seriesRepo: SeriesRepo,
    private readonly exchangeRatesRepo: ExchangeRatesRepo,
    private readonly productTagsRepo: ProductTagsRepo,
    private readonly tagRepo: TagRepo,
    private readonly brandRepo: BrandRepo,
    private readonly productImageRepo: ProductImageRepo,
  ) {}
  public async execute(command: ICreateProductParams): Promise<ICreateProductResponse> {
    const { uuid, tags, name, images, seriesUuid } = command
    await this.validate(command)
    await this.create(command)
    if (tags) {
      await this.addTags(tags, uuid)
    }
    if (seriesUuid) {
      await this.increaseProductTotal(seriesUuid)
    }
    const brandUrl = await this.getBrandPreSignedUrl(name)
    const imageUrl = await this.getImagePreSignedUrl(name, images)
    return { brandUrl, imageUrl }
  }

  private async validate(command: ICreateProductParams): Promise<void> {
    const { name, uuid, parentCategoryUuid, subCategoryUuid, seriesUuid, exchangeRateId, tags, brandUuid } = command
    const isExistName = await this.checkExistingName(name)
    const isExistUuid = await this.checkExistingUuid(uuid)
    if (isExistName) {
      throw new RpcException(ERRORS.PRODUCT_EXIST_NAME)
    }
    if (isExistUuid) {
      throw new RpcException(ERRORS.PRODUCT_EXIST_UUID)
    }
    if (seriesUuid) {
      await this.validateSeries(seriesUuid)
    }
    if (exchangeRateId) {
      await this.validateExchangeRate(exchangeRateId)
    }
    if (parentCategoryUuid || subCategoryUuid) {
      await this.validateCategory(subCategoryUuid, parentCategoryUuid)
    }
    if (tags) {
      await this.validateTags(tags)
    }
    if (brandUuid) {
      await this.validateBrand(brandUuid)
    }
  }
  private async validateSeries(seriesUuid: string): Promise<void> {
    const existSeries = await this.seriesRepo.findOne({ where: { uuid: seriesUuid } })
    if (!existSeries) {
      throw new RpcException(ERRORS.SERIES_NOT_FOUND)
    }
  }

  private async validateExchangeRate(exchangeRateId: number): Promise<void> {
    const existExchangeRate = await this.exchangeRatesRepo.findOne({ where: { id: exchangeRateId } })
    if (!existExchangeRate) {
      throw new RpcException(ERRORS.EXCHANGE_RATE_NOT_FOUND)
    }
  }
  private async validateCategory(subCategoryUuid?: string, parentCategoryUuid?: string): Promise<void> {
    const existSubCategory = await this.categoryRepo.findOne({
      where: { uuid: subCategoryUuid, parentUuid: parentCategoryUuid },
    })
    const existParentCategory = await this.categoryRepo.findOne({
      where: { uuid: parentCategoryUuid },
    })
    if (!existSubCategory && subCategoryUuid) {
      throw new RpcException(ERRORS.CATEGORY_SUB_NOT_FOUND)
    }
    if (!existParentCategory && parentCategoryUuid) {
      throw new RpcException(ERRORS.CATEGORY_PARENT_NOT_FOUND)
    }
  }

  private async validateTags(tags: number[]): Promise<void> {
    const existTags = await this.tagRepo.findAll({
      where: {
        id: In(tags),
      },
    })
    if (existTags.length !== tags.length) {
      throw new RpcException(ERRORS.TAG_NOT_FOUND)
    }
  }

  private async validateBrand(brandUuid: string): Promise<void> {
    const existBrand = await this.brandRepo.findOne({ where: { uuid: brandUuid } })
    if (!existBrand) {
      throw new RpcException(ERRORS.PRODUCT_BRAND_NOT_FOUND)
    }
  }

  private async create(data: Prettify<ICreateProductParams>): Promise<void> {
    const { name, images } = data
    const productUuid = await this.createProduct(data)
    return this.addImages(images, productUuid, name)
  }
  private async createProduct(data: ICreateProductParams): Promise<string> {
    const slug = this.helper.slugify(data.name)
    const thumbnail = `products/${slug}.webp`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tags, images, ...createData } = data
    const product = this.repo.create({ ...createData, slug, thumbnail })
    await this.repo.save(product)
    return product.uuid
  }

  private async addImages(imageUuid: string[], productUuid: string, name: string): Promise<void> {
    await this.validateImageUuid(imageUuid)
    const createImages: DeepPartial<ProductImageEntity>[] = imageUuid.map((uuid) => {
      const slug = this.helper.slugify(name)
      return {
        uuid,
        productUuid,
        imageUrl: `products/${slug}-${uuid}.webp`,
      }
    })
    const productImages = this.productImageRepo.createMany(createImages)
    await this.productImageRepo.saveMany(productImages)
  }

  private async addTags(tags: number[], productUuid: string) {
    const createTags = tags.map((tag) => ({ tagId: tag, productUuid }))
    const productTags = this.productTagsRepo.create(createTags)
    await this.productTagsRepo.save(productTags)
  }

  private async increaseProductTotal(seriesUuid: string): Promise<void> {
    const series = await this.seriesRepo.findOne({ where: { uuid: seriesUuid } })
    if (!series) {
      return
    }
    series.productTotal += 1
    await this.seriesRepo.save(series)
  }

  private async checkExistingName(name: string): Promise<boolean> {
    return Boolean(await this.repo.findOne({ where: { name } }))
  }
  private async checkExistingUuid(uuid: string): Promise<boolean> {
    return Boolean(await this.repo.findOne({ where: { uuid } }))
  }
  private async validateImageUuid(uuid: string[]): Promise<void> {
    const image = await this.productImageRepo.findOne({ where: { uuid: In(uuid) } })
    if (image) {
      throw new RpcException(ERRORS.PRODUCT_IMAGE_EXIST_UUID)
    }
  }
  private async getBrandPreSignedUrl(name: string): Promise<string> {
    const slug = this.helper.slugify(name)
    const key = `products/${slug}.webp`
    return await this.s3.getPreSignedUrl(key)
  }
  private async getImagePreSignedUrl(name: string, imageUuid: string[]): Promise<{ uuid: string; url: string }[]> {
    return await Promise.all(
      imageUuid.map(async (uuid) => {
        const slug = this.helper.slugify(name)
        return {
          uuid,
          url: await this.s3.getPreSignedUrl(`products/${slug}-${uuid}.webp`),
        }
      }),
    )
  }
}
