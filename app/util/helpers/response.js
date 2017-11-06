/**
 * @module util/helpers/response
 * @description Provides a standard format for sending HTTP responses. See: JSend.
 * @requires util/errors
 * @requires util/validation
 * @param {Object} res Response object passed from express middleware
 * @param {String} status Status code. 'success', 'fail', or 'error'
 * @param {?Object} data Response data to send.
 * @returns {Function}
 */

/* Custom Dependencies */
const Errors = require('../errors')
const Validation = require('../validation')

module.exports = function(res, status, data) {
  const statuses = ['success', 'fail', 'error']
  if (!res || !Validation.types.isObject(res)) {
    return Errors.fatal("res object is required")
  } else if (!res.send || !Validation.types.isFunction(res.send)) {
    return Errors.fatal("res.send must be a function")
  } else if (!status || !Validation.types.isInArray(status, statuses)) {
    return Errors.fatal("Invalid status specified")
  } else if (!data || (data !== null && !Validation.types.isObject(data))) {
    return Errors.fatal("data must be an object")
  } else if (status === 'error' && !Validation.types.isString(data.message)) {
    return Errors.fatal("data.message must be a string responses indicitive of errors")
  }
  return res.send({status: status, data: data})
}
