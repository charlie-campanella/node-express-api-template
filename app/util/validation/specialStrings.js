/**
 * @module util/validation/specialStrings
 * @description Provides methods for validating strings
 * @requires util/errors
 * @returns {Object}
 */

/* Third Party Dependencies */
const mongoose = require('mongoose')

/* Custom Dependencies */
const errors = require('../errors')

/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a valid business name. Letters, numbers, spaces, & certain special characters. No spaces at beginning/end.
 * @returns {Boolean}
 */
const isBusinessNameString = function(input) {
  if (!input || typeof input !== "string") {
    return false
  }
  let regex = /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/
  return regex.test(input)
}

/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is an email string. Validated against a Regular Expression.
 * @returns {Boolean}
 */
const isEmailString = function(input) {
  if (!input || typeof input !== "string") {
    return false
  } else if (input.length < 1 || input.length > 64) {
    return false
  }
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(input)
}

/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a valid ObjectID string. Validated against a function included with Mongoose.
 * @returns {Boolean}
 */
const isObjectIdString = function(input) {
  if (!input || typeof input !== "string") {
    return false
  } else if (input.length < 1 || input.length > 100) {
    return false
  }
  return mongoose.Types.ObjectId.isValid(input)
}

module.exports = {
  isBusinessNameString,
  isEmailString,
  isObjectIdString
}
