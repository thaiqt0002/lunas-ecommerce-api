import { CopyObjectCommand, DeleteObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class S3Serv {
  readonly #bucketName = this.configService.get<string>('AWS_BUCKET_NAME')
  private readonly S3 = new S3Client([
    {
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        sercetAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    },
  ])
  constructor(private readonly configService: ConfigService) {}

  public async getPreSignedUrl(Key: string) {
    if (this.#bucketName === undefined) {
      throw new Error('Bucket name is not defined')
    }
    const command = new PutObjectCommand({ Bucket: this.#bucketName, Key })
    return await getSignedUrl(this.S3, command, { expiresIn: 3600 })
  }

  public async copyObject(sourceKey: string, destinationKey: string) {
    if (this.#bucketName === undefined) {
      throw new Error('Bucket name is not defined')
    }
    const command = new CopyObjectCommand({
      Bucket: this.#bucketName,
      CopySource: `${this.#bucketName}/${sourceKey}`,
      Key: destinationKey,
    })
    return await this.S3.send(command)
  }

  public async deleteObject(Objects: { Key: string }[]) {
    if (this.#bucketName === undefined) {
      throw new Error('Bucket name is not defined')
    }
    const command = new DeleteObjectsCommand({
      Bucket: this.#bucketName,
      Delete: { Objects },
    })
    return await this.S3.send(command)
  }
}
