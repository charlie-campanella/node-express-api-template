/**
 * @module util/errors
 * @description Returns all errors modules for easy accessibility
 * @requires util/errors/fatal
 * @requires util/errors/log
 * @returns {Object} {fatal, log, parse}
 */
 const fatal = require('./fatal')
 const log = require('./log')
 const parse = require('./parse')
 module.exports = {
   fatal,
   log,
   parse
 }
