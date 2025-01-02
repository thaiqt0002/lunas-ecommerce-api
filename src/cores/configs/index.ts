import { DEFAULT_DB_PORT, DEFAULT_PORT } from '~/cores/constants'

export default () => ({
  APP_ENV: process.env.APP_ENV ?? 'local',
  SERVER_DOMAIN: process.env.SERVER_DOMAIN ?? 'localhost',
  PORT: process.env.PORT ? Number(process.env.PORT) : DEFAULT_PORT,
  DB: {
    HOST: process.env.DB_HOST ?? 'db',
    PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : DEFAULT_DB_PORT,
    USER: process.env.DB_USER ?? 'root',
    PASSWORD: process.env.DB_PASSWORD ?? '12345678',
    NAME: process.env.DB_NAME ?? 'LUNAS_ECOMMERCE',
  },
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? '',
  RESEND_SENDER: process.env.RESEND_SENDER ?? '',
  AWS_REGION: process.env.AWS_REGION ?? '',
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME ?? '',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? 'access token secret',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? '1h',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? 'refresh token secret',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d',
  VERIFY_TOKEN_SECRET: process.env.VERIFY_TOKEN_SECRET ?? 'verify token secret',
  VERIFY_TOKEN_EXPIRES_IN: process.env.VERIFY_TOKEN_EXPIRES_IN ?? '1d',
  VERIFY_EMAIL_URL: process.env.WEB_BASE_URL ?? '',
  IMAGE_BASE_URL: process.env.IMAGE_BASE_URL ?? '',

  PAYOS_CLIENT_ID: process.env.PAYOS_CLIENT_ID ?? '',
  PAYOS_API_KEY: process.env.PAYOS_API_KEY ?? '',
  PAYOS_CHECKSUM: process.env.PAYOS_CHECKSUM ?? '',
  PAYMENT_URL: process.env.PAYMENT_URL ?? '',
})
