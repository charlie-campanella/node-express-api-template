/**
 * @file environment.js
 * @module environment
 * @requires config
 * @requires middlewares
 * @requires routes
 * @requires util
 * @description Configures the application environment by requiring and 'using' third party middleware, connecting to the database, and specifying which port the app should listen to.
 * @param {Function}
 */

/* Third Party Dependencies */
const app = require('express')()
const bodyParser = require('body-parser') //Parses body of HTTP Requests for easy data access
const helmet = require('helmet') //Provides basic security
const hpp = require('hpp') //Prevents HTTP Parameter Pollution Attacks (i.e something.com?user=1&user=2 would result in an ARRAY being sent)
const forceHttps = require('express-force-https') //Force SSL connections
const mongoose = require('mongoose') //Used to connect and query a MongoDB instance
const RateLimit = require('express-rate-limit') //Rate limiter

/* Custom Dependencies */
const config = require('./config')
const middlewares = require('./middlewares')
const routes = require('./routes')
const util = require('./util')

module.exports = {
  init: function () {
    const routes = require('./routes')
    /* Use 3rd Party Middleware */
    if (config.env === 'production') {
      app.use(forceHttps)
    }
    process.on('unhandledRejection', function(err, promise) {
      console.error('Unhandled rejection (promise: ', promise, ', reason: ', err, ').');
    })
    app.use(helmet())
    app.use(bodyParser.json())
    app.use(hpp())

    /* IP-Based Request Throttling */
    app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    let limiter = new RateLimit({
      windowMs: 60*1000 * config.constants.server.throttle.periodMinutes,
      max: config.constants.server.throttle.periodRequestLimit,
      delayMs: 0, // disable delaying - full speed until the max limit is reached,
      handler: function (req, res) {
        util.helpers.response(res, "error", {
          message: "Too many requests. Try again later."
        })
      }
    })
    app.use(limiter)
    /* End Throttling */

    /* Use Custom Middleware */
    app.use(middlewares.cors())
    app.use('/', routes)
    app.use(middlewares.errors())

    /* Connects to MongoDB Instance */
    mongoose.Promise = Promise
    mongoose.connect('mongodb://'+config.constants.server.db.user+':'+config.constants.server.db.password+'@'+config.constants.server.db.host+'/'+config.constants.server.db.name, {
      useMongoClient: true,
      promiseLibrary: global.Promise
    })
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('Connected to '+config.constants.server.db.host+'/'+config.constants.server.db.name)
    })

    /* Starts a UNIX socket and listens for connections on the given path. */
    app.listen(config.constants.server.port, function(err) {
      if (err) {
        throw new Error(config.constants.app_name + " failed to start")
      }
      console.log(config.constants.app_name + " is running on port " + config.constants.server.port)
    })
  },
  app: app
}
