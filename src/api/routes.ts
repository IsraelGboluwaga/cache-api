import * as express from 'express'
import '../../setup/envConfig'
import {
  getValueByKey,
  createPair,
  getAllKeys,
  updateEntry,
  deleteEntry,
  deleteAll,
} from './controllers/cache.ctrl'

const routes = (app: express.Application) => {
  app.get('/:key', getValueByKey)
  app.post('/key', createPair)
  app.get('/keys', getAllKeys)
  app.put('/key', updateEntry)
  app.delete('/:key', deleteEntry)
  app.delete('/keys', deleteAll)
  return app
}

export { routes }
