/**
 * @module controllers/users
 * @description Returns all user controller modules for easy access
 * @requires controllers/users/confirm
 * @requires controllers/users/login
 * @requires controllers/users/register
 * @returns {Object} {register, confirm}
 */

/* Custom Dependencies */
const confirm = require('./confirm')
const login = require('./login')
const register = require('./register')

module.exports = {
  register,
  confirm,
  login
}
