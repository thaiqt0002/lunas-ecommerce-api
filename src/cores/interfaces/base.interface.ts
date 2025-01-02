/**
 * Flattens a TypeScript type, making it easier to read or display in tools like error messages.
 */
export type Prettify<Type> = {
  [Key in keyof Type]: Type[Key]
}

/**
 * Removes the specified keys from the type T, creating a new type.
 */
export type StrictOmit<Type, Key extends keyof Type> = Omit<Type, Key>

/**
 * Makes all properties of a type optional, recursively making nested objects partial as well.
 */
export type DeepPartial<Type> = {
  [Key in keyof Type]?: Type[Key] extends { [key: string]: unknown } ? DeepPartial<Type[Key]> : Type[Key]
}

/**
 * Recursively makes all properties of a type readonly, including nested objects.
 */
export type DeepReadonly<Type> = {
  readonly [Key in keyof Type]: Type[Key] extends { [key: string]: unknown } ? DeepReadonly<Type[Key]> : Type[Key]
}

/**
 * Makes all properties of a type nullable.
 */
export type Nullable<Type> = {
  [Key in keyof Type]: Type[Key] | null
}

/**
 * Extracts the return type of a function component (FC) or any function.
 */
export type FCReturnType<Type extends (...args: any[]) => any> = ReturnType<Type>

// eslint-disable-next-line
export type AnyType = any

// eslint-disable-next-line
export enum ERole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IError {
  code: unknown
  desc?: string
}

export interface IRes<Type> {
  statusCode: number
  data: Type
  message: string | null
  error: IError | null
}

// eslint-disable-next-line
export enum ImageType {
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  JPG = 'image/jpg',
  GIF = 'image/gif',
  SVG = 'image/svg+xml',
  BMP = 'image/bmp',
  TIFF = 'image/tiff',
  WEBP = 'image/webp',
}

export interface IPayloadJwt {
  uuid: string
  role: ERole
}

export interface IPaginatedResult<Type> {
  data: Type[]
  total: number
  page: number
  limit: number
}

export interface IBaseId {
  id: number
}

export interface IBaseUuid {
  uuid: string
}

export interface IBaseDate {
  createdAt: Date
  updatedAt: Date
}

export interface IBaseName {
  name: string
  slug: string
}
