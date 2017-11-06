/**
 * @module middlewares/auth
 * @description Custom authentication middleware that provides authentication
 * @requires util
 * @requires config
 * @returns {Function}
 */
 /* Third Party Dependencies */
 const jwt = require('jsonwebtoken')
 /* Custom Dependencies */
 const config = require('../config')
 const util = require('../util')

 module.exports = function() {
   return function(req, res, next) {
     const authHeader = req.headers['authorization']
     if (!authHeader || !util.validation.types.isString(authHeader)) {
       return util.helpers.response(res, "error", {
         message: "Authorization header is required"
       })
     } else if (authHeader.substring(0,7) !== "Bearer ") {
       return util.helpers.response(res, "error", {
         message: "Authorization header value must follow the Bearer <token> format"
       })
     }
     const token = authHeader.split(" ")[1] || null
     jwt.verify(token, config.constants.server.encryption.jwtSecret, function(err, decoded) {
        if (err) {
          return util.helpers.response(res, "fail", {
            auth_failure: true,
            message: "Invalid JWT submitted"
          })
        }
        req.AUTHORIZED_USER = decoded
        return next()
     })
   }
 }
