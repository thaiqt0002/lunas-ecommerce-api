export interface IBaseVariant {
  uuid: string
  name: string
  fee: number
  price: number
}

export interface ICreateVariantParams {
  productUuid: string

  variants: IBaseVariant[]
}

export type IDeleteVariantParams = Pick<IBaseVariant, 'uuid'>
