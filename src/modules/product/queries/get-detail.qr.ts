import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { ProductRepo, VariantRepo } from '~/cores/repo'

export default class GetProductDetailQr implements IQuery {
  public readonly uuid: string
  constructor(uuid: string) {
    this.uuid = uuid
  }
}
@QueryHandler(GetProductDetailQr)
export class GetProductDetailHdlr implements IQueryHandler<GetProductDetailQr> {
  constructor(
    private readonly repo: ProductRepo,
    private readonly variantRepo: VariantRepo,
  ) {}

  public async execute({ uuid }: GetProductDetailQr) {
    const product = await this.getProduct(uuid)
    return { product }
  }

  private async getProduct(uuid: string) {
    const product = await this.repo.findOne({
      select: {
        uuid: true,
        name: true,
        slug: true,
        thumbnail: true,
        description: true,
        salePrice: true,
        quantity: true,
        country: true,
        status: true,
        priority: true,
        preorderStartDate: true,
        preorderEndDate: true,
        releaseDate: true,
        createdAt: true,
        updatedAt: true,
        brand: {
          uuid: true,
          name: true,
        },
        series: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
          image: true,
          productTotal: true,
        },
        parentCategory: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
        },
        subCategory: {
          uuid: true,
          name: true,
          slug: true,
          description: true,
        },
        productImages: {
          uuid: true,
          imageUrl: true,
        },
        variants: {
          uuid: true,
          name: true,
          price: true,
          image: {
            id: true,
            imageUrl: true,
          },
        },
      },
      where: { uuid },
      relations: {
        series: true,
        parentCategory: true,
        subCategory: true,
        tags: true,
        productImages: true,
        variants: {
          image: true,
        },
        brand: true,
      },
    })
    if (!product) {
      throw new RpcException(ERRORS.PRODUCT_NOT_FOUND)
    }
    return product
  }

  private async getVariant(uuid: string) {
    return await this.variantRepo.findAll({
      where: { productUuid: uuid },
      select: {
        productUuid: false,
      },
      relations: {
        image: true,
      },
    })
  }
}
