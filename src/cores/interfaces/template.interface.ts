export interface IBaseTemplate {
  id: number
  page: string
  priority: number
  isActive: boolean
  layoutId: number
  attributes: string
}

export interface ICreateTemplateParams extends Omit<IBaseTemplate, 'id'> {}
export interface IUpdateTemplateParams {
  id: number
  page: string
  priority?: number
  isActive: boolean
  layoutId: number
  attributes: string
}
export interface IDeleteTemplateParams extends Pick<IBaseTemplate, 'id'> {}
