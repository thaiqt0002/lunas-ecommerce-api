export interface IBaseCategory {
  uuid: string

  name: string

  slug: string

  description: string

  parentUuid: string | null

  createdAt: Date

  updatedAt: Date
}

export interface IQueryCategoryParams {
  uuid: string
  name: string
  sub: IQueryCategoryParams[]
}

export type ICreateCategoryParams = Pick<IBaseCategory, 'name' | 'description' | 'parentUuid'>

export interface IFindAllCategoriesRes extends Omit<IBaseCategory, 'parentUuid'> {
  sub: Omit<IFindAllCategoriesRes, 'sub'>[]
}

export interface IDeleteCategoryParams {
  uuid: string
}
