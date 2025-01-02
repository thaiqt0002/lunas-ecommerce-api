import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'

import { AnyType } from '~/cores/interfaces'

@Injectable()
export class HelperServ {
  constructor(private readonly configService: ConfigService) {}

  public isObjectsUniqueValueKey(array: object[], key: string): boolean {
    const values = array.map((item) => item[key])
    return new Set(values).size === values.length
  }

  public slugify(string_: string): string {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string_
      .toString()
      .toLowerCase()
      .replaceAll(/[àáâãăạảấầẩẫậắằẳẵặ]/gi, 'a')
      .replaceAll(/[èéêẹẻẽếềểễệ]/gi, 'e')
      .replaceAll(/[iìíĩỉị]/gi, 'i')
      .replaceAll(/[òóôõơọỏốồổỗộớờởỡợ]/gi, 'o')
      .replaceAll(/[ùúũưụủứừửữự]/gi, 'u')
      .replaceAll(/[ýỳỵỷỹ]/gi, 'y')
      .replaceAll(/đ/gi, 'd')
      .replaceAll(/\s+/g, '-')
      .replace(p, (c) => b.charAt(a.indexOf(c)))
      .replaceAll('&', '-and-')
      .replaceAll(/[^\w-]+/g, '')
      .replaceAll(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  public filterObject(object: object, keys: string[]): object {
    return keys.reduce((newObject: { [key: string]: AnyType }, key) => {
      let element: object = {}
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (object[key]) {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
        element = { [key]: object[key] }
      }
      return { ...newObject, ...element }
    }, {})
  }

  public getURLImage(image: string): string {
    const url = this.configService.get<string>('IMAGE_BASE_URL') ?? ''
    if (!url) {
      throw new Error('IMAGE_BASE_URL not found in .env')
    }
    return `${url}/${image}`
  }

  public getUniqueListBy<Type extends object>(array: Type[], key: keyof Type): Type[] {
    return [...new Map(array.map((item) => [item[key], item])).values()]
  }

  public getUserNameRandomFromEmail(email: string): string | null {
    let [username] = email.split('@')
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    Array.from({ length: 5 }).forEach(() => {
      username += possible.charAt(Math.floor(Math.random() * possible.length))
    })
    return username ?? null
  }

  public generateUUID(): string {
    return uuidv4()
  }

  public generateOTP(): string {
    const min = 1000
    const step = 9000
    const otp = Math.floor(min + Math.random() * step).toString()
    return otp
  }

  public generateKey(length: number) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const { length: charactersLength } = characters
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result + String(Date.now())
  }

  public genUuid(): string {
    return uuidv4()
  }
  public groupBy = <T, K extends keyof any>(array: T[], key: (index: T) => K) =>
    array.reduce(
      (groups, item) => {
        //eslint-disable-next-line
        ;(groups[key(item)] ||= []).push(item)
        return groups
      },
      {} as Record<K, T[]>,
    )
}
