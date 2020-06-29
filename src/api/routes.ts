import * as express from 'express'
import '../../setup/envConfig'
import { getValueByKey, createPair } from './controllers/cache.ctrl'

const routes = (app: express.Application) => {
  app.get('/', getValueByKey)
  app.post('/', createPair)
  return app
}

export { routes }
