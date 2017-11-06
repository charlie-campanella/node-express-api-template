/**
 * @module routes
 * @requires routes/users
 * @requires util
 * @description Routes define API endpoints connect them to the appropriate controllers. This module ensures that all routes are defined.
 */
/* Third Party Dependencies */
const routes = require('express').Router()
/* Custom Dependencies */
const util = require('../util')

const userRoutes = require('./users')

routes.use('/user', userRoutes)
routes.all('*', function(req, res) {
  util.helpers.response(res, 'error', {
    message: "Unauthorized Request"
  })
})

module.exports = routes
