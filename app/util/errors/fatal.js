/**
 * @module util/errors/fatal
 * @description Handles the throwing of fatal errors
 * @param {String} [description] Description of the error (optional)
 * @returns {Function}
 */
 module.exports = function(description) {
   if (description && typeof description !== 'string') {
     throw new TypeError('description must be a string')
   }
   throw new Error(description)
 }
