/**
 * @module util/errors/log
 * @description Handles the throwing of non-fatal errors
 * @param {String} description Description of the error
 * @returns {Function}
 */

 module.exports = function(description) {
   if (typeof description !== 'string') {
     throw new TypeError('description must be a string')
   }
   console.log("WARNING: " + description)
 }
