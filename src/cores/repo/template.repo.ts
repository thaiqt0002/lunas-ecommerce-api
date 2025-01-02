import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'
import { TemplateEntity } from '../entities'

type ITemplateRepo = IBaseRepo<TemplateEntity>
type IRepo = Repository<TemplateEntity>
@Injectable()
class TemplateRepo extends BaseAbstractRepo<TemplateEntity> implements ITemplateRepo {
  public constructor(@InjectRepository(TemplateEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default TemplateRepo
