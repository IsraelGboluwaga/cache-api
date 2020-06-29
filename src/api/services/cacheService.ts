import moment from 'moment-timezone'
import { logger } from '../../config/winston'
import { Cache, ICache } from '../models/Cache'
import { compact, map } from 'lodash/fp'
import { config } from '../../config/settings'

const getRandomString = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const startingPoint = Math.floor(Math.random() * chars.length)
  return chars.substr(startingPoint, 10) //may be less than 10
}

const createNewPairFromRandomString = async (key: string) => {
  logger.info('Cache Miss')
  const random = getRandomString()
  const newEntry = await Cache.create({
    key,
    value: random,
    ttl: config.ttl,
  })
  return newEntry.value
}

const fetchValueByKey = async (key?: string) => {
  if (!key) {
    throw new Error('kindly pass in a key')
  }
  const keyEntry: ICache | null = await Cache.findOne({ key })
  if (!keyEntry) {
    return await createNewPairFromRandomString(key)
  }

  const lastUpdated = moment(keyEntry.updatedAt)
  const now = moment()
  if (lastUpdated.diff(now, 'seconds') > keyEntry.ttl) {
    return await createNewPairFromRandomString(key)
  }
  logger.info('Cache Hit')
  return keyEntry.value
}

const createPair = async (args: ICache) => {
  const keyExists = await Cache.findOne({ key: args.key })
  if (keyExists) {
    throw new Error('Value already exists for key. Kindly make update call.')
  }
  const newEntry = await Cache.create(args)
  if (newEntry) return 'Created'
  throw new Error('Error occured creating. Kindly try again in a bit.')
}

const fetchAllKeys = async () => {
  const all = await Cache.find({})
  const now = moment()
  return compact(
    map((each: ICache) => {
      const lastUpdated = moment(each.updatedAt)
      const condition = lastUpdated.diff(now, 'seconds') > each.ttl
      return condition && each.key
    })(all)
  )
}

const updateEntry = async ({ key, value }: { key: string; value: string }) => {
  return await Cache.findOneAndUpdate({ key }, { value, ttl: config.ttl })
}

const deleteEntry = async (key?: string) => {
  if (!key) {
    throw new Error('kindly pass in a key')
  }
  return await Cache.findOneAndDelete({ key })
}

const deleteAll = async () => {
  return await Cache.remove({})
}

export { fetchValueByKey, createPair, fetchAllKeys, updateEntry, deleteEntry, deleteAll }
