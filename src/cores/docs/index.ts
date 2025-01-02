import type { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, type OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { apiReference } from '@scalar/nestjs-api-reference'

class DocumentBuild {
  readonly #paths = '/v1/docs'
  readonly #title = 'Lunas E-Commerce API'
  readonly #version = '0.0.1'
  readonly #contact = {
    name: 'Lunas Support',
    url: 'https://lunas.com/support',
    email: 'support@lunas.com',
  }
  readonly #config = new DocumentBuilder()
    .setTitle(this.#title)
    .setVersion(this.#version)
    .setContact(this.#contact.name, this.#contact.url, this.#contact.email)
    .build()
  constructor(private readonly app: NestExpressApplication) {}

  public build() {
    this.#createSwaggerModule(this.#paths, this.#config)
  }

  #createSwaggerModule(path: string, config: Omit<OpenAPIObject, 'paths'>) {
    const document = SwaggerModule.createDocument(this.app, config)
    SwaggerModule.setup(path, this.app, document, {
      customSiteTitle: 'Lunas API Documentation',
      customfavIcon: 'https://store.lunas.vn/favicon.ico',
    })
    this.app.use(
      '/v1/scalar',
      apiReference({
        theme: 'deep-space',
        spec: {
          content: document,
        },
      }),
    )
  }
}
export default DocumentBuild
