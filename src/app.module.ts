import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'

import Configurations from '~/cores/configs'
import * as entities from '~/cores/entities'
import CoreModule from '~/cores/modules/core.module'

import AllTcpExceptionsFilter from './cores/filters/all-tcp.exception.filter'
import ReposModule from './cores/repo/repo.module'
import BrandModule from './modules/brand/brand.module'
import CategoryModule from './modules/category/category.module'
import ExchangeRateModule from './modules/exchange-rate/exchange-rate.module'
import PublicModule from './modules/get-public/get-public.module'
import LayoutModule from './modules/layout/layout.module'
import ProductModule from './modules/product/product.module'
import SeriesModule from './modules/series/series.module'
import TagModule from './modules/tag/tag.module'
import TemplateModule from './modules/template/template.module'
import VariantModule from './modules/variant/variant.module'

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: '.env.ecommerce',
      isGlobal: true,
      load: [Configurations],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configServ: ConfigService) => ({
        type: 'mysql',
        host: configServ.get<string>('DB.HOST'),
        port: configServ.get<number>('DB.PORT'),
        username: configServ.get<string>('DB.USER'),
        password: configServ.get<string>('DB.PASSWORD'),
        database: 'LUNAS_ECOMMERCE',
        autoLoadEntities: true,
        synchronize: false,
        entities: Object.values(entities),
      }),
      inject: [ConfigService],
    }),
    CoreModule,
    ReposModule,
    CategoryModule,
    ExchangeRateModule,
    SeriesModule,
    TagModule,
    VariantModule,
    BrandModule,
    ProductModule,
    PublicModule,
    BrandModule,
    LayoutModule,
    TemplateModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: AllTcpExceptionsFilter,
    },
  ],
})
export class AppModule {}
