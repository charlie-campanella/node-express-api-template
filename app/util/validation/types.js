/**
 * @module util/validation/types
 * @description Provides methods for validating the types of inputs
 * @requires util/errors
 * @returns {Object}
 */

/* Custom Dependencies */
const fatal = require('../errors/fatal')

/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is an array
 * @returns {Boolean}
 */
const isArray = function(input) {
  return Array.isArray(input);
}
/**
 * @function
 * @param {*} needle The item to search for within an array
 * @param {Array} haystack The array to search
 * @description Determines whether or not an item is an array
 * @returns {Boolean}
 */
const isInArray = function(needle, haystack) {
  if (needle === undefined) {
    return fatal("needle must be defined")
  } else if (!isArray(haystack)) {
    return fatal("haystack must be an array")
  } else if (haystack.length < 1) {
    return false
  }
  if (haystack.indexOf(needle) !== -1) {
    return true
  } else {
    return false
  }
}
/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a boolean
 * @returns {Boolean}
 */
const isBoolean = function(input) {
  return typeof input === 'boolean'
}
/**
 * @function
 * @param {Boolean} boolean
 * @description Determines whether or not a boolean is truthy
 * @returns {Boolean}
 */
const isBooleanTrue = function(boolean) {
  if (!isBoolean(boolean)) {
    return fatal("input must be a boolean")
  } else if (boolean === true) {
    return true
  }
  return false
}
/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a function
 * @returns {Boolean}
 */
const isFunction = function(input) {
  return typeof input === 'function'
}
/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a number
 * @returns {Boolean}
 */
const isNumber = function(input) {
  return typeof input === 'number'
}
/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is an object
 * @returns {Boolean}
 */
const isObject = function(input) {
  return typeof input === 'object'
}
/**
 * @function
 * @param {*} input Any input type
 * @description Determines whether or not a given input is a string
 * @returns {Boolean}
 */
const isString = function(input) {
  return typeof input === 'string'
}
/**
 * @function
 * @param {String} string String to be checked
 * @param {Number} minimum Minimum string length
 * @param {Number} maximum Max string length
 * @description Determines whether or not a string is within provided lengths
 * @returns {Boolean}
 */
const isStringWithinLength = function(string, minimum, maximum) {
  if (!string || !isString(string)) {
    fatal("string must be a string")
  } else if (!isNumber(minimum) || minimum < 0) {
    fatal("minimum must be a positive number")
  } else if (!isNumber(maximum) || maximum < 0) {
    fatal("maximum must be a positive number")
  } else if (minimum > maximum) {
    fatal("maximum must be greater than minimum")
  }
  if (string.length >= minimum && string.length <= maximum) {
    return true
  }
  return false
}

module.exports = {
  isArray,
  isInArray,
  isBoolean,
  isBooleanTrue,
  isFunction,
  isNumber,
  isObject,
  isString,
  isStringWithinLength
}
