import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { In } from 'typeorm'

import { ProductEntity } from '~/cores/entities'
import { IGetProductByVariant } from '~/cores/interfaces'
import { ProductRepo } from '~/cores/repo'

export default class GetByVariantQr implements IQuery {
  variant: IGetProductByVariant[] = []
  constructor(variant: IGetProductByVariant[]) {
    this.variant = variant
  }
}
@QueryHandler(GetByVariantQr)
export class GetProductByVariantHlr implements IQueryHandler<GetByVariantQr> {
  constructor(private readonly productRepo: ProductRepo) {}

  public async execute({ variant }: GetByVariantQr) {
    const uuids = variant.map(({ variantUuid }) => variantUuid)
    const products = await this.getProduct(uuids)
    const result = products.map(({ variants, ...product }) => {
      const filteredVariants = variants.map((va) => {
        const variantIndex = variant.find(({ variantUuid }) => variantUuid === va.uuid)
        if (!variantIndex) return []
        return {
          ...va,
          cart: {
            quantity: variantIndex.quantity,
            uuid: variantIndex.cartUuid,
            createdAt: variantIndex.cartCreatedAt,
          },
        }
      })
      return { ...product, variants: filteredVariants }
    })
    return result
  }
  public async getProduct(uuids: string[]): Promise<ProductEntity[]> {
    return await this.productRepo.findAll({
      select: {
        name: true,
        uuid: true,
        slug: true,
        salePrice: true,
        thumbnail: true,
        status: true,
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
      relations: {
        variants: {
          image: true,
        },
      },
      where: {
        variants: {
          uuid: In(uuids),
        },
      },
    })
  }
}
