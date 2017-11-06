/**
 * @module config/development/constants
 * @description Overwrites production constant variables to ones suitable for development mode
 * @requires config/production/constants
 * @returns {Object} Modified application configuration object
 */
let constants = require('../production/constants')
constants.server.throttle.periodRequestLimit = 10000000
module.exports = constants
