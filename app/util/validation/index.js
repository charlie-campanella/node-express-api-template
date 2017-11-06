/**
 * @module util/validation
 * @requires util/validation/dateTime
  * @requires util/validation/specialStrings
 * @requires util/validation/types
 * @description Returns all validation modules for easy accessibility
 * @returns {Object} {dateTime, specialStrings, types}
 */

 /* Custom Dependencies */
 const dateTime = require('./dateTime')
 const specialStrings = require('./specialStrings')
 const types = require('./types')

 module.exports = {
   dateTime,
   specialStrings,
   types
 }
