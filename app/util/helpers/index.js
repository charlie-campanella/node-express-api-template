/**
 * @module util/helpers
 * @description Returns all helper modules for easy accessibility
 * @requires util/helpers/response
 * @requires util/helpers/general
 * @returns {Object} {response}
 */
 const general = require('./general')
 const response = require('./response')
 module.exports = {
   general,
   response
 }
