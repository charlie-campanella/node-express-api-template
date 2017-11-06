/**
 * @module classes
 * @description Returns all class modules for easy accessibility
 * @requires classes/mail
 * @requires classes/users
 * @returns {Object} {mail, user}
 */
 /* Custom Dependencies */
const mail = require('./mail')
const user = require('./user')
 module.exports = {
   mail,
   user
 }
