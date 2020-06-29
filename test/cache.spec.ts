import { expect } from 'chai'
import { doBeforeEach } from './helpers/doBeforeEach'
import { cacheFactory } from './factories'
import * as CacheService from '../src/api/services/cacheService'

import { server } from './../setup/www'
import { Cache, ICache } from 'src/api/models/Cache'
const factory = cacheFactory()

describe('Cache', () => {
  beforeEach(async () => doBeforeEach())

  describe('GET Fetch Key', () => {
    it('should throw error if key does not exist', async () => {
      try {
        await CacheService.fetchValueByKey()
      } catch (e) {
        expect(e.message).to.equal('kindly pass in a key')
      }
    })

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

  describe('GET Fetch All Keys', () => {
    it('should return an empty array if there are no keys', async (done: () => any) => {
      const allKeys = await CacheService.fetchAllKeys()
      expect(allKeys).to.be.an('array')
      expect(allKeys).to.be.empty
      done()
    })

    it('should return all keys', async (done: () => any) => {
      const key = 'keyz'
      const value = 'valuuuueee'
      await CacheService.createPair({ key, value } as ICache)
      const allKeys = await CacheService.fetchAllKeys()
      expect(allKeys).to.be.an('array')
      expect(allKeys).to.include(key)
      done()
    })
  })

  describe('PUT Update entry by key', () => {
    it('should update entry successfully', async (done: () => any) => {
      const key = 'keyz'
      const value = 'valuuuueee'
      await CacheService.createPair({ key, value } as ICache)
      const newValue = 'a-value'
      const updated = await CacheService.updateEntry({ key, value: newValue })
      expect(updated).to.not.be.null
      expect(updated).to.haveOwnProperty('value')
      expect(updated?.value).to.equal(newValue)
      done()
    })
  })

  describe('DELETE Remove entry by key', () => {
    it('should remove entry successfully', async (done: () => any) => {
      const key = 'keyz'
      const value = 'valuuuueee'
      await CacheService.createPair({ key, value } as ICache)
      const deleted = await CacheService.deleteEntry(key)
      const entry = await Cache.findOne({ key })
      expect(entry).to.not.be.null
      done()
    })
  })

  describe('DELETE Remove all entries', () => {
    it('should delete all entries in the cache', async (done: () => any) => {
      const key = 'keyz'
      const value = 'valuuuueee'
      await CacheService.createPair({ key, value } as ICache)
      await CacheService.createPair({ key: key + 'as', value: value + 'as' } as ICache)
      const fetchAllData = await CacheService.deleteAll()
      const entries = await Cache.find({})
      expect(entries).to.not.be.an('array')
      expect(entries).to.be.empty
      done()
    })
  })
})
