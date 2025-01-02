import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { Prettify } from '~/cores/interfaces'
import { ICreateBrandParams } from '~/cores/interfaces/brand.interface'
import { BrandRepo } from '~/cores/repo'

import { CreateBrandDto } from '../brand.dto'

export default class CreateBrandCmd extends CreateBrandDto implements ICommand {
  name!: string
  constructor(otps: Prettify<ICreateBrandParams>) {
    const { name } = otps
    super(otps)
    this.name = name
  }
}
@CommandHandler(CreateBrandCmd)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCmd> {
  constructor(private readonly repo: BrandRepo) {}
  public async execute(cmd: CreateBrandCmd): Promise<void> {
    await this.validate(cmd)
    await this.create(cmd)
  }

  private async create(cmd: CreateBrandCmd) {
    const brand = this.repo.create(cmd)
    await this.repo.save(brand)
  }

  private async validate(cmd: CreateBrandCmd) {
    await this.checkExistName(cmd.name)
  }

  private async checkExistName(name: string) {
    const existingBrand = await this.repo.findOne({
      where: { name },
    })
    if (existingBrand) {
      throw new RpcException(ERRORS.BRAND_EXIST_NAME)
    }
  }
}
