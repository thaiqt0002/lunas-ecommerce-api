import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { TagEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type ITagRepo = IBaseRepo<TagEntity>
type IRepo = Repository<TagEntity>
@Injectable()
class TagRepo extends BaseAbstractRepo<TagEntity> implements ITagRepo {
  public constructor(@InjectRepository(TagEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default TagRepo
