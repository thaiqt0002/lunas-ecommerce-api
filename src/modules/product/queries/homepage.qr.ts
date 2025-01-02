import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { In } from 'typeorm'

import { EMasterBrand, EMasterCategory, EMasterSeries, EMasterTag } from '~/cores/interfaces'
import { ProductRepo, SeriesRepo, TagRepo } from '~/cores/repo'

export default class GetHomePageQr implements IQuery {}
@QueryHandler(GetHomePageQr)
export class GetHomePageHdr implements IQueryHandler<GetHomePageQr> {
  private readonly MAX_GSC = 5
  private readonly MAX_NEW_PRODUCT = 8
  constructor(
    private readonly repo: ProductRepo,
    private readonly seriesRepo: SeriesRepo,
    private readonly tagRepo: TagRepo,
  ) {}

  public async execute() {
    const bestSeller = await this.getBestSeller()
    const gsc = await this.getGSC()
    const newFigure = await this.getNewFigure()
    const bestSeries = await this.getBestSeries()
    const newProduct = await this.getNewProduct()
    const newVersionProduct = await this.getNewVer()
    return {
      newProduct,
      bestSeller,
      newFigure,
      bestSeries,
      gsc: gsc.length > this.MAX_GSC ? gsc.slice(0, this.MAX_GSC) : gsc,
      newVersionProduct,
    }
  }

  private async getNewVer() {
    const series = await this.seriesRepo.findAll({
      where: {
        name: In([
          EMasterSeries.GenshinImpact,
          EMasterSeries.HonkaiStarRail,
          EMasterSeries.Haikyuu,
          EMasterSeries.Conan,
        ]),
      },
    })
    if (series.length === 0) return []
    // filter by series
    const newVersionProduct = await Promise.all(
      series.map(async (ser) => {
        // find all product uuid has tag new
        const newProductUuid = await this.repo.findAll({
          where: {
            seriesUuid: ser.uuid,
            tags: {
              name: In([EMasterTag.NEW, EMasterTag.NEW_VERSION]),
            },
          },
        })

        if (newProductUuid.length === 0) return { series: ser, product: [] }
        // find all product has tag new
        const newProduct = await this.repo.findAll({
          select: {
            uuid: true,
            name: true,
            tags: true,
            thumbnail: true,
            salePrice: true,
            createdAt: true,
          },
          where: {
            uuid: In(newProductUuid.map(({ uuid }) => uuid)),
          },
          relations: {
            variants: { image: true },
            tags: true,
          },
        })

        if (newProduct.length === 0) return { series: ser, product: [] }
        return { series: ser, product: newProduct }
      }),
    )
    return newVersionProduct
  }

  private async getBestSeller() {
    return await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        thumbnail: true,
        salePrice: true,
        quantity: true,
        slug: true,
      },
      where: {
        tags: { name: In([EMasterTag.BEST_SELLER, EMasterTag.HotDay, EMasterTag.HotWeek, EMasterTag.HotMonth]) },
      },
      relations: {
        tags: true,
      },
    })
  }
  private async getGSC() {
    return await this.repo.findAll({
      order: {
        createdAt: 'DESC',
      },
      select: {
        uuid: true,
        name: true,
        thumbnail: true,
        salePrice: true,
        quantity: true,
        slug: true,
        createdAt: true,
      },
      where: {
        brand: {
          name: EMasterBrand.GoodSmileCompany,
        },
      },
    })
  }
  private async getNewFigure() {
    return await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        thumbnail: true,
        salePrice: true,
        quantity: true,
        slug: true,
        createdAt: true,
      },
      where: {
        parentCategory: {
          slug: EMasterCategory.Figure,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      take: 5,
    })
  }

  private async getBestSeries() {
    return await this.seriesRepo.findAll({
      select: {
        uuid: true,
        name: true,
        slug: true,
        image: true,
        productTotal: true,
        description: true,
      },
      order: {
        productTotal: 'DESC',
      },
      take: 12,
    })
  }

  private async getNewProduct() {
    const products = await this.repo.findAll({
      where: {
        tags: { name: EMasterTag.NEW },
      },
    })
    const productUuid = products.map(({ uuid }) => uuid)
    const newTagProduct = await this.repo.findAll({
      select: {
        uuid: true,
        name: true,
        tags: true,
        thumbnail: true,
        salePrice: true,
        createdAt: true,
      },
      relations: {
        tags: true,
      },
      where: {
        uuid: In(productUuid),
      },
      order: {
        createdAt: 'DESC',
      },
    })
    const tags = await this.getTagWhereName([
      EMasterTag.SHOUNEN,
      EMasterTag.SEINEN,
      EMasterTag.GAME,
      EMasterTag.BG,
      EMasterTag.BL,
      EMasterTag.GL,
    ])
    const newProduct = tags.map((tag) => {
      // find all product has tag contain tag.name
      const productList = newTagProduct.filter(({ tags: Tags }) => Tags.map(({ name }) => name).includes(tag.name))
      return {
        tag,
        productList:
          productList.length > this.MAX_NEW_PRODUCT ? productList.slice(0, this.MAX_NEW_PRODUCT) : productList,
      }
    })
    return newProduct
  }

  private async getTagWhereName(names: string[]) {
    return await this.tagRepo.findAll({
      where: {
        name: In(names),
      },
    })
  }
}
