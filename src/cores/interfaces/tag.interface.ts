export interface IBaseTag {
  id: number
  name: string
}

export interface ICreateManyTagParams {
  names: string[]
}

export type IFindAllTagRes = IBaseTag
