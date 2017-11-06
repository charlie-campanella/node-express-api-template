/**
 * @module middlewares/errors
 * @description Middleware module that handles errors
 * @requires util
 * @returns {Function}
 */

 /* Custom Dependencies */
 const util = require('../util')

 module.exports = function() {
   return function(err, req, res, next) {
     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
       return util.helpers.response(res, 'error', {
         message: "Request body must contain valid JSON"
       })
     } else if (err) {
       util.helpers.response(res, 'error', {
         message: "Something went wrong"
       })
       throw new Error(err)
       return
     }
     next()
   }
 }
