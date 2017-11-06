/**
 * @module middlewares/permissions
 * @description Provides middleware function that determines whether or not a user has permission to access a specified route. If the route is not 'open', then this middleware function requires the auth() middleware function to be passed to the route first.
 * @requires util
 * @requires config
 * @param {Array} permissions Array of account types that are able to access a specific endpoint. e.g ['admin'] or ['open'] or ['business', 'user']
 * @returns {Function}
 */

/* Custom Dependencies */
const config = require('../config')
const util = require('../util')

module.exports = function(permissions) {
  if (!permissions || !util.validation.types.isArray(permissions)) {
    return util.errors.fatal("permissions must be an array")
  } else if (permissions.length < 1) {
    return util.errors.fatal("permissions array must contain values")
  }
  const permissionTypes = config.constants.users.types
  permissionTypes.push('open') //adds 'open' type for publically accessible endpoints
  for (var i = 0; i < permissions.length; i++) { //iterate through permissions and validate
    if (!util.validation.types.isInArray(permissions[i], permissionTypes)) {
      return util.errors.fatal("Invalid permission type: " + permissions[i])
    }
  }
  return function(req, res, next) {
    if (util.validation.types.isInArray('open', permissions)) { //publically accessible endpoint
      return next()
    } else if (!req.AUTHORIZED_USER) { //auth() middleware function must be called
      return util.errors.fatal("req.AUTHORIZED_USER was not found. Non-public endpoints require auth() middleware function to be called first.")
    } else if (!req.AUTHORIZED_USER.type || !util.validation.types.isInArray(req.AUTHORIZED_USER.type, permissions)) {
      return util.helpers.response(res, "error", {
        message: "You do not have permission to access this endpoint."
      })
    }
    next()
  }
}
