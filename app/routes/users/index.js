/**
 * @module routes/users
 * @requires controllers/users
 * @requires middlewares
 * @requires util
 * @description Defines routes for user registration, login, confirmation, etc.
 * @param {Function} app - Invoked Express.js instance. (e.g express())
 */
/* Third Party Dependencies */
const routes = require('express').Router()
/* Custom Dependencies */
const middlewares = require('../../middlewares')
const userControllers = require('../../controllers/users')
const util = require('../../util')

routes.post('/register', middlewares.permissions(['open']), userControllers.register)
routes.post('/confirm', middlewares.permissions(['open']), userControllers.confirm)
routes.post('/login', middlewares.permissions(['open']), userControllers.login)

module.exports = routes
