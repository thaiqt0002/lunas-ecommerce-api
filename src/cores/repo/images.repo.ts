import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ImageEntity } from '~/cores/entities'

import { IBaseRepo } from './base.interface'
import { BaseAbstractRepo } from './base.repo'

type IImagesRepo = IBaseRepo<ImageEntity>
type IRepo = Repository<ImageEntity>
@Injectable()
class ImagesRepo extends BaseAbstractRepo<ImageEntity> implements IImagesRepo {
  public constructor(@InjectRepository(ImageEntity) private readonly _: IRepo) {
    super(_)
  }
}
export default ImagesRepo
