const mongoose = require('mongoose')

module.exports.init = async () => {
  // mongoose.set('useCreateIndex', true)

  await mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })

  log.info('connected to database')
}
