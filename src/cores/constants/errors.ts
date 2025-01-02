import { HttpStatus } from '@nestjs/common'

const BAD_REQUEST = 'BAD_REQUEST'
const FORBIDDEN = 'FORBIDDEN'
const UNAUTHORIZED = 'UNAUTHORIZED'
const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
const VALIDATION_ERROR = 'VALIDATION_ERROR'
const NOT_FOUND = 'NOT_FOUND'

/**
 * FEATURE: Basic Authentication
 * - Sign in with email and password
 */
const EMAIL_OR_PASSWORD_IS_INCORRECT = {
  code: 'E400_EMAIL_OR_PASSWORD_IS_INCORRECT',
  desc: 'Email or Password is incorrect',
}
const INVALID_TOKEN = {
  code: 'E401_INVALID_TOKEN',
  desc: 'Invalid token',
}
const USER_NOT_FOUND = {
  code: 'E404_USER_NOT_FOUND',
  desc: 'User not found',
}

//////////////////////////////////////////

/**
 * FEATURE: User Management
 * - Sign up with email, password, and full name
 */
const EMAIL_ALREADY_EXISTS = {
  code: 'E400_EMAIL_ALREADY_EXISTS',
  desc: 'Email already exists',
}
const USERNAME_ALREADY_EXISTS = {
  code: 'E400_USERNAME_ALREADY_EXISTS',
  desc: 'Username already exists',
}

//////////////////////////////////////////

/**
 * FEATURE: Role Management
 * - Create a new role
 * - Get all roles
 */
const ROLE_NOT_FOUND = {
  code: 'E404_ROLE_NOT_FOUND',
  desc: 'Role not found',
}
const ROLE_ALREADY_EXISTS = {
  code: 'E400_ROLE_ALREADY_EXISTS',
  desc: 'Role already exists',
}

//////////////////////////////////////////

/**
 * FEATURE: Series Management
 * - Create a new series
 * - Get all series
 * - Delete a series
 */
const SERIES_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_SERIES_NOT_FOUND',
  code: 'E404_SERIES_NOT_FOUND',
  desc: 'Series not found',
}
const SERIES_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_SERIES_ALREADY_EXISTS',
  code: 'E400_SERIES_ALREADY_EXISTS',
  desc: 'Series already exists',
}

//////////////////////////////////////////

/**
 * FEATURE: Category Management
 * - Create a new category
 * - Get all categories
 * - Delete a category
 */
const CATEGORY_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_CATEGORY_NOT_FOUND',
  code: 'E404_CATEGORY_NOT_FOUND',
  desc: 'Category not found',
}
const CATEGORY_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_CATEGORY_ALREADY_EXISTS',
  code: 'E400_CATEGORY_ALREADY_EXISTS',
  desc: 'Category already exists',
}
const CATEGORY_PARENT_NOT_FOUND = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_CATEGORY_PARENT_NOT_FOUND',
  code: 'E400_CATEGORY_PARENT_NOT_FOUND',
  desc: 'Category parent not found',
}
const CATEGORY_SUB_NOT_FOUND = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_CATEGORY_SUB_NOT_FOUND',
  code: 'E400_CATEGORY_SUB_NOT_FOUND',
  desc: 'Sub Category not found',
}

/**
 * FEATURE: Tag Management
 * - Create a new tag
 * - Get all tags
 * - Delete a tag
 */
const TAG_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_TAG_NOT_FOUND',
  code: 'E404_TAG_NOT_FOUND',
  desc: 'Tag not found',
}
const TAG_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_TAG_ALREADY_EXISTS',
  code: 'E400_TAG_ALREADY_EXISTS',
  desc: 'Tag already exists',
}

/**
 * - FEATURE: Exchange rate Management
 * - Create a new exchange rate
 */
const EXCHANGE_RATE_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_EXCHANGE_RATE_NOT_FOUND',
  code: 'E404_EXCHANGE_RATE_NOT_FOUND',
  desc: 'Exchange rate not found',
}
const EXCHANGE_RATE_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_EXCHANGE_RATE_ALREADY_EXISTS',
  code: 'E400_EXCHANGE_RATE_ALREADY_EXISTS',
  desc: 'Exchange rate already exists',
}

/**
 * - FEATURE: Product Management
 * - Create a new Product
 */
const PRODUCT_EXIST_NAME = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_PRODUCT_EXIST_NAME',
  code: 'E400_PRODUCT_EXIST_NAME',
  desc: 'Product name has been used!',
}
const PRODUCT_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_PRODUCT_NOT_FOUND',
  code: 'E404_PRODUCT_NOT_FOUND',
  desc: 'Product not found!',
}
const PRODUCT_EXIST_UUID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_PRODUCT_EXIST_UUID',
  code: 'E400_PRODUCT_EXIST_UUID',
  desc: 'Product uuid has been used!',
}
const PRODUCT_SERIES_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_PRODUCT_SERIES_NOT_FOUND',
  code: 'E404_PRODUCT_SERIES_NOT_FOUND',
  desc: 'Series not found!',
}
const PRODUCT_CATEGORY_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_PRODUCT_CATEGORY_NOT_FOUND',
  code: 'E404_PRODUCT_CATEGORY_NOT_FOUND',
  desc: 'Category not found!',
}
const PRODUCT_EXCHANGE_RATE_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_PRODUCT_EXCHANGE_RATE_NOT_FOUND',
  code: 'E404_PRODUCT_EXCHANGE_RATE_NOT_FOUND',
  desc: 'Exchange rate not found!',
}
const PRODUCT_BRAND_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_PRODUCT_BRAND_NOT_FOUND',
  code: 'E404_PRODUCT_BRAND_NOT_FOUND',
  desc: 'Brand not found!',
}
const PRODUCT_BRAND_EXIST = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E404_PRODUCT_BRAND_EXIST',
  code: 'E404_PRODUCT_BRAND_EXIST',
  desc: 'Brand name has been used!',
}
const PRODUCT_BRAND_REQUIRED = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_PRODUCT_BRAND_REQUIRED',
  code: 'E400_PRODUCT_BRAND_REQUIRED',
  desc: 'You need to fill brandUuid or brandName!',
}

/**
 * - FEATURE: Variant Management
 * - Create a new Variant
 */
const VARIANT_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_VARIANT_NOT_FOUND',
  code: 'E404_VARIANT_NOT_FOUND',
  desc: 'Variant not found!',
}
const VARIANT_ALREADY_EXISTS = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_VARIANT_ALREADY_EXISTS',
  code: 'E400_VARIANT_ALREADY_EXISTS',
  desc: 'Variant name has been used!',
}

/**
 * - FEATURE: Brand Management
 * - Create a new Brand
 */
const BRAND_EXIST_NAME = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_BRAND_EXIST_NAME',
  code: 'E400_BRAND_EXIST_NAME',
  desc: 'Brand name has been used!',
}

/**
 * - FEATURE: Product Image
 */
const PRODUCT_IMAGE_EXIST_UUID = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_PRODUCT_IMAGE_EXIST_UUID',
  code: 'E400_PRODUCT_IMAGE_EXIST_UUID',
  desc: 'Product image uuid has been used!',
}

/**
 * - FEATURE: Layout
 */
const LAYOUT_EXIST_NAME = {
  statusCode: HttpStatus.BAD_REQUEST,
  message: 'E400_LAYOUT_EXIST_NAME',
  code: 'E400_LAYOUT_EXIST_NAME',
  desc: 'Layout name has been used!',
}

const LAYOUT_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_LAYOUT_NOT_FOUND',
  code: 'E404_LAYOUT_NOT_FOUND',
  desc: 'Layout not found!',
}
const TEMPLATE_NOT_FOUND = {
  statusCode: HttpStatus.NOT_FOUND,
  message: 'E404_TEMPLATE_NOT_FOUND',
  code: 'E404_TEMPLATE_NOT_FOUND',
  desc: 'Template not found!',
}
export const ERRORS = Object.freeze({
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND,

  EMAIL_OR_PASSWORD_IS_INCORRECT,
  INVALID_TOKEN,
  USER_NOT_FOUND,

  // User Management
  EMAIL_ALREADY_EXISTS,
  USERNAME_ALREADY_EXISTS,

  // Role Management
  ROLE_NOT_FOUND,
  ROLE_ALREADY_EXISTS,

  // Series Management
  SERIES_NOT_FOUND,
  SERIES_ALREADY_EXISTS,

  // Category Management
  CATEGORY_NOT_FOUND,
  CATEGORY_ALREADY_EXISTS,
  CATEGORY_PARENT_NOT_FOUND,
  CATEGORY_SUB_NOT_FOUND,

  // Tag Management
  TAG_NOT_FOUND,
  TAG_ALREADY_EXISTS,

  // Exchange rate Management
  EXCHANGE_RATE_NOT_FOUND,
  EXCHANGE_RATE_ALREADY_EXISTS,

  // Product Management
  PRODUCT_EXIST_NAME,
  PRODUCT_EXIST_UUID,
  PRODUCT_SERIES_NOT_FOUND,
  PRODUCT_CATEGORY_NOT_FOUND,
  PRODUCT_EXCHANGE_RATE_NOT_FOUND,
  PRODUCT_NOT_FOUND,
  PRODUCT_BRAND_NOT_FOUND,
  PRODUCT_BRAND_EXIST,
  PRODUCT_BRAND_REQUIRED,

  // Variant Management
  VARIANT_NOT_FOUND,
  VARIANT_ALREADY_EXISTS,

  // Brand Management
  BRAND_EXIST_NAME,
  // Product Image
  PRODUCT_IMAGE_EXIST_UUID,
  // Layout
  LAYOUT_EXIST_NAME,
  LAYOUT_NOT_FOUND,
  TEMPLATE_NOT_FOUND,
})
