import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { BaseIdDto } from '~/cores/dtos'
import { IDeleteTemplateParams } from '~/cores/interfaces'
import { TemplateRepo } from '~/cores/repo'

export default class DeleteTemplateCmd extends BaseIdDto implements ICommand {
  constructor({ id }: IDeleteTemplateParams) {
    super()
    this.id = id
  }
}

@CommandHandler(DeleteTemplateCmd)
export class DeleteTemplateHdlr implements ICommandHandler<IDeleteTemplateParams> {
  constructor(private readonly repo: TemplateRepo) {}
  async execute(command: IDeleteTemplateParams): Promise<void> {
    const { id } = command
    await this.delete(id)
  }
  private async delete(id: number) {
    return await this.repo.deleteById(id)
  }
}
