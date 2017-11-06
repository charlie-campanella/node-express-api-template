/**
 * @module util/validation/dateTime
 * @description Provides methods for validating dates and times
 * @requires util/errors
 * @returns {Object}
 */

/* Custom Dependencies */
const errors = require('../errors')

/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a unix timestamp string
 * @returns {Boolean}
 */
const isTimeStamp = function(input) {
  if (!input || typeof input !== "string" || input.length !== 10) {
    return false
  }
  let regex = /^[0-9]*$/
  return regex.test(input)
}

module.exports = {
  isTimeStamp
}
