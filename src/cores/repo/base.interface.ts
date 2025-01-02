import type { DeepPartial, FindManyOptions } from 'typeorm'

// eslint-disable-next-line
export interface IBaseRepo<T> {
  create: (data: DeepPartial<T>) => T
  createMany: (data: DeepPartial<T>[]) => T[]
  save: (data: DeepPartial<T>) => Promise<T>
  saveMany: (data: DeepPartial<T>[]) => Promise<T[]>
  findOne: (options: FindManyOptions<T>) => Promise<T | null>
  findOneById: (id: number) => Promise<T | null>
  findOneByUuid: (uuid: string) => Promise<T | null>
  findByCondition: (filterCondition: FindManyOptions<T>) => Promise<T | null>
  findAll: (options?: FindManyOptions<T>) => Promise<T[]>
  remove: (data: T) => Promise<T>
  findWithRelations: (relations: FindManyOptions<T>) => Promise<T[]>
  preload: (entityLike: DeepPartial<T>) => Promise<T | undefined>
}
