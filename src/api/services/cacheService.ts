import { logger } from '../../config/winston'
import { Cache, ICache } from '../models/Cache'

const getRandomString = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const startingPoint = Math.floor(Math.random() * chars.length)
    return chars.substr(startingPoint, 10) //may be less than 10
  }

const fetchValueByKey = async (key?: string) => {
  if (!key) {
    throw new Error('kindly pass in a key') 
  }
  const keyEntry: ICache | null = await Cache.findOne({ key })
  logger.info('Cache Miss')
  if (!keyEntry) {
    const random = getRandomString()
    const newEntry = await Cache.create({
      key,
      value: random,
    })
    return newEntry.value
  }

  logger.info('Cache Hit')
  return keyEntry.value
}

const createPair = async (args: ICache) => {
    const keyExists = Cache.findOne({ key: args.key })
    if (keyExists) {
        throw new Error('Value already exists for key. Kindly call update.')
    }
    const newEntry = await Cache.create(args)
    if (newEntry) return 'Created'
    throw new Error('Error occured creating. Kindly try in a bit.')
}

export { fetchValueByKey, createPair }