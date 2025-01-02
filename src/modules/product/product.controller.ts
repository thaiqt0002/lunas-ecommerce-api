import { Controller } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { MessagePattern, Payload } from '@nestjs/microservices'

import { BaseUuidDto } from '~/cores/dtos'
import { IQueryProductParams } from '~/cores/interfaces'

import CreateProductCmd from './commands/create.cmd'
import DeleteProductCmd from './commands/delete.cmd'
import { CreateProductDto, GetProductByVariantDto } from './product.dto'
import GetAllProductQr from './queries/get-all.qr'
import GetByVariantQr from './queries/get-by-variant.qr'
import GetProductDetailQr from './queries/get-detail.qr'
import SearchKeywordProductQr from './queries/search-keyword.qr'

@Controller()
export default class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @MessagePattern('products.find_all')
  async findAll(@Payload() data: IQueryProductParams) {
    return await this.queryBus.execute(new GetAllProductQr(data))
  }
  @MessagePattern('products.find_one')
  findOne(@Payload() { uuid }: BaseUuidDto) {
    return this.queryBus.execute(new GetProductDetailQr(uuid))
  }

  @MessagePattern('products.search')
  async search(@Payload() keyword: string) {
    return await this.queryBus.execute(new SearchKeywordProductQr({ keyword }))
  }

  @MessagePattern('products.create')
  async create(@Payload() data: CreateProductDto) {
    const preSignedUrl = await this.commandBus.execute(new CreateProductCmd(data))
    return preSignedUrl
  }

  @MessagePattern('products.delete')
  async delete(@Payload() data: BaseUuidDto) {
    await this.commandBus.execute(new DeleteProductCmd(data))
    return 'Delete product success'
  }

  @MessagePattern('product.get_by_variant')
  async findByVariant(@Payload() variant: GetProductByVariantDto[]) {
    return await this.queryBus.execute(new GetByVariantQr(variant))
  }
}
