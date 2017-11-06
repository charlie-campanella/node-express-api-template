/**
 * @module middlewares
 * @description Returns all general middleware modules for easy accessibility
 * @requires middlewares/auth
 * @requires middlewares/cors
 * @requires middlewares/errors
 * @requires middlewares/permissions
 * @returns {Object} {auth, cors, errors, permissions}
 */

/* Custom Dependencies */
const auth = require('./auth')
const cors = require('./cors')
const errors = require('./errors')
const permissions = require('./permissions')

module.exports = {
  auth,
  cors,
  errors,
  permissions
}
