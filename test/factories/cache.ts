import factory from 'factory-girl'
import Chance from 'chance'
import { Cache } from '../../src/api/models'
import { ICache } from 'src/api/models/Cache'

const chance = Chance()

const cacheFactory = () => {
  const attr = {
    key: chance.string(),
    value: chance.string(),
    ttl: chance.integer(),
  }
  factory.define('Cache', Cache, attr)
  return factory
}
export { cacheFactory }
