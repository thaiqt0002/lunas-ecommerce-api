export interface IBaseImage {
  id: number
  imageUrl: string
  productUuid: string
  variantUuid: string
}

export interface IBaseProductImage {
  uuid: string
  productUuid: string
  imageUrl: string
}

export interface IBaseProductTag {
  productUuid: string
  tagId: number
}

export interface IBaseProduct {
  uuid: string
  name: string
  slug: string
  description: string
  originalPrice: number
  salePrice: number
  quantity: number
  thumbnail: string
  country: string
  status: string
  priority: number
  seriesUuid?: string
  brandUuid?: string
  exchangeRateId?: number
  parentCategoryUuid: string
  subCategoryUuid: string
  preorderStartDate?: Date
  preorderEndDate?: Date
  releaseDate?: Date
}

export interface ICreateProductParams extends Omit<IBaseProduct, 'slug' | 'thumbnail'> {
  tags?: number[]
  images: string[]
}

export interface ICreateProductResponse {
  brandUrl: string
  imageUrl: {
    uuid: string
    url: string
  }[]
}
export type IDeleteProductParams = Pick<IBaseProduct, 'uuid'>

export interface IQueryProductParams {
  page: number
  limit: number
  search: string
  sort: number
}

export interface ISearchProductParams extends Omit<IQueryProductParams, 'sort'> {
  brandUuids?: string[]
  minPrice?: number
  maxPrice?: number
  created?: number
  updated?: number
  price?: number
  parentCategoryUuid?: string
  subCategoryUuid?: string
}
export type IUpdateProductParams = Omit<IBaseProduct, 'uuid'>

export interface IGetProductByVariant {
  variantUuid: string
  quantity: number
  cartUuid: string
  cartCreatedAt: Date
}
