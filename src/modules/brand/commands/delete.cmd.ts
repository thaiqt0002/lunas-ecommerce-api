import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'

import { BaseUuidDto } from '~/cores/dtos'
import { BrandRepo } from '~/cores/repo'

export default class DeleteBrandCmd extends BaseUuidDto implements ICommand {
  constructor({ uuid }: BaseUuidDto) {
    super()
    this.uuid = uuid
  }
}

@CommandHandler(DeleteBrandCmd)
export class DeleteBrandHandler implements ICommandHandler<DeleteBrandCmd> {
  constructor(private readonly repo: BrandRepo) {}
  async execute(command: DeleteBrandCmd): Promise<void> {
    await this.delete(command.uuid)
  }
  private async delete(uuid: string) {
    await this.repo.deleteByUuid(uuid)
  }
}
