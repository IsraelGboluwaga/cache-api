import * as express from 'express'
import '../../../setup/envConfig'

const routes = (app: express.Application) => {
  app.use('/', (req, res) => res.send('ok'))
  return app
}

export { routes }