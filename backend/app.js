const APP_ENV = process.env.NODE_ENV || 'development'
const runMode = process.env.RUN_MODE || 'app'
global.APP_ENV = APP_ENV
const config = require('./config/config').get(APP_ENV)
global.config = config
require('events').EventEmitter.defaultMaxListeners = 5

require('dotenv').config({ path: `./.env.${APP_ENV}` })
const Koa = require('koa')
const koaCors = require('@koa/cors')
const app = new Koa()

const model = require('./models')
model.init()

if (runMode === 'app') {
  const router = require('./routes/routes')
  const body = require('koa-body')

  app.use(
    body({
      json: { limit: '50mb', extended: true },
      includeUnparsed: true,
      urlencoded: { limit: '50mb', extended: true },
      formLimit: '50mb',
      multipart: true,
      formidable: {
        uploadDir: './tmp',
        keepExtensions: true
      }
    })
  )

  app.use(
    koaCors({
      methods: 'POST, GET, PUT, DELETE, OPTIONS',
      allowMethods: 'Origin, X-Requested-With, Content-Type, Accept',
      credentials: true
    })
  )

  app.use(router.routes())
  .use(router.allowedMethods())
}

const port = config.ports[runMode]

log.info('process.env.RUN_MOD',process.env.RUN_MOD);
log.info(`started in ${APP_ENV} env, listening to port ${port}`)
app.listen(port)
