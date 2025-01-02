import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { In } from 'typeorm'

import { ICreateManyTagParams, Prettify } from '~/cores/interfaces'
import { TagRepo } from '~/cores/repo'

import { CreateManyTagParamsDto } from '../tag.dto'

export default class CreateManyTagCmd extends CreateManyTagParamsDto implements ICommand {
  public constructor({ names }: ICreateManyTagParams) {
    super()
    this.names = names
  }
}

@CommandHandler(CreateManyTagCmd)
export class CreateManyTagHlr implements ICommandHandler<ICreateManyTagParams> {
  public constructor(private readonly repo: TagRepo) {}
  public async execute({ names }: Prettify<ICreateManyTagParams>) {
    await this.createMany(names)
  }

  private async createMany(names: string[]) {
    const newNames = await this.getNew(names)
    const newTags = newNames.map((name) => ({ name }))
    const tags = this.repo.createMany(newTags)
    await this.repo.saveMany(tags)
  }

  private async getNew(names: string[]) {
    const existing = await this.getExisting(names)
    const existingNames = existing.map(({ name }) => name)
    const newNames = names.filter((name) => !existingNames.includes(name))
    return newNames
  }

  private async getExisting(names: string[]) {
    const tags = await this.repo.findAll({
      where: { name: In(names) },
    })
    return tags
  }
}
