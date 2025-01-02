export interface IBaseSeries {
  uuid: string

  name: string

  slug: string

  description: string

  productTotal: number

  image: string

  createdAt: Date

  updatedAt: Date
}

export type ICreateSeries = Pick<IBaseSeries, 'name' | 'description'>
export type IDeleteSeriesParams = Pick<IBaseSeries, 'uuid'>
