import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { RpcException } from '@nestjs/microservices'

import { ERRORS } from '~/cores/constants'
import { BaseIdDto } from '~/cores/dtos'
import { Prettify } from '~/cores/interfaces'
import { TagRepo } from '~/cores/repo'

export default class DeleteTagCommand extends BaseIdDto implements ICommand {
  constructor({ id }: BaseIdDto) {
    super()
    this.id = id
  }
}

@CommandHandler(DeleteTagCommand)
export class DeleteTagHandler implements ICommandHandler<DeleteTagCommand> {
  constructor(private readonly repo: TagRepo) {}
  public async execute({ id }: Prettify<DeleteTagCommand>) {
    await this.checkExist(id)
    await this.delete(id)
  }
  private async checkExist(id: number) {
    const tag = await this.repo.findOneById(id)
    if (!tag) {
      throw new RpcException(ERRORS.TAG_NOT_FOUND)
    }
    return true
  }
  private async delete(id: number) {
    await this.repo.deleteById(id)
  }
}
