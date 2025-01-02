import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export const CORS: CorsOptions = {
  origin: [
    // **NOTE: Add your domain here
    // **ENV: local **
    'http://local.store.lunas.vn:3000',
    'http://local.cms.lunas.vn:3000',
    'http://local.auth.lunas.vn:3000',

    // **ENV: development **
    'http://dev.store.lunas.vn',
    'http://dev.cms.lunas.vn',
    'http://dev.auth.lunas.vn',

    // **ENV: prod **
    'https://store.lunas.vn',
    'https://cms.lunas.vn',
    'https://auth.lunas.vn',

    // **NOTE: Add your domain here
    /https:\/\/pr-.+\.lunas\.vn$/,
  ],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Cookie',
    'Authorization',
    'X-Requested-With',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}
