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

const routes = (app: express.Router) => {
  app.get('/keys', getAllKeys)
  app.get('/:key', getValueByKey)
  app.post('/key', createPair)
  app.put('/key', updateEntry)
  app.delete('/keys', deleteAll)
  app.delete('/:key', deleteEntry)
  return app
}

export { routes }
