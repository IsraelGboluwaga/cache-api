import { expect } from 'chai'
import { doBeforeEach } from './helpers/doBeforeEach'
import { cacheFactory } from './factories'
import * as CacheService from '../src/api/services/cacheService'

import { server } from './../setup/www'
import { ICache } from 'src/api/models/Cache'
const factory = cacheFactory()

describe('GET Fetch Key', () => {
  it('should return new generated value if value does not exist for key', async (done: () => any) => {
    const gibberish = 'dknsdjfnsvdnvjdfnsdfjvnsdifjvsdfnvs'
    const randomKey = gibberish.substr(0, Math.random() * gibberish.length)
    const dbValue = await CacheService.fetchValueByKey(randomKey)
    expect(dbValue).to.be.a('string')
    done()
  })

  it('should return value if key exists', async (done: () => any) => {
    const key = 'keyz'
    const value = 'valuuuueee'
    await CacheService.createPair({ key, value } as ICache)
    const dbValue = await CacheService.fetchValueByKey(key)
    expect(dbValue).to.be.a('string')
    expect(dbValue).to.equal(value)
    done()
  })
})
