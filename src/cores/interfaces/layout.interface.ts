export interface IBaseLayout {
  id: number
  name: string
  exampleData: string
  exampleImage: string
}

export interface ICreateLayoutParams extends Omit<IBaseLayout, 'id' | 'exampleImage'> {}

export interface IUpdateLayoutParams extends Omit<IBaseLayout, 'id'> {}

export interface IDeleteLayoutParams extends Pick<IBaseLayout, 'id'> {}
