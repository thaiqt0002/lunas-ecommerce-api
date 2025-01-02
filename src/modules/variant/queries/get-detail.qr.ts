import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { VariantEntity } from '~/cores/entities'
import { VariantRepo } from '~/cores/repo'

export default class GetVariantDetailQr implements IQuery {
  public readonly uuid: string
  constructor(uuid: string) {
    this.uuid = uuid
  }
}
@QueryHandler(GetVariantDetailQr)
export class GetVariantDetailHldr implements IQueryHandler<GetVariantDetailQr> {
  constructor(private readonly repo: VariantRepo) {}

  public async execute({ uuid }: GetVariantDetailQr): Promise<VariantEntity> {
    const variant = await this.getVariantByUuid(uuid)
    if (!variant) {
      throw new RpcException(ERRORS.VARIANT_NOT_FOUND)
    }
    return variant
  }
  private async getVariantByUuid(uuid: string): Promise<VariantEntity | null> {
    return await this.repo.findOne({
      where: { uuid },
    })
  }
}
