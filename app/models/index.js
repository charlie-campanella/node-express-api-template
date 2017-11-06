/**
 * @module models
 * @description Returns all database model modules for easy accessibility
 * @requires models/users
 * @requires models/businesses
 * @returns {Object} {businesses, users}
 */

 /* Custom Dependencies */
const businesses = require('./businesses')
const users = require('./users')

module.exports = {
  businesses,
  users
}
