/**
 * @module util
 * @requires util/errors
 * @requires util/helpers
 * @requires util/validation
 * @description Returns all utility modules for easy accessibility
 * @returns {Object} {errors, helpers, validation}
 */

/* Custom Dependencies */
const errors = require('./errors')
const helpers = require('./helpers')
const validation = require('./validation')

module.exports = {
  errors,
  helpers,
  validation
}
