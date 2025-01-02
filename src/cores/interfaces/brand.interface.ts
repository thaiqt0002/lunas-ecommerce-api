export interface IBaseBrand {
  uuid: string
  name: string
}

export interface ICreateBrandParams extends Omit<IBaseBrand, 'uuid'> {}
