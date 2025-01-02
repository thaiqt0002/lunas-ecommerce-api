export interface IBaseExchanegRate {
  id: number
  currency: string
  rate: number
}

export interface ICreateExchangeRateParams {
  currency: string
  rate: number
}
