/**
 * @module util/errors/parse
 * @description Takes in errors and parses them into an array
 * @requires util/validation
 * @param {String} [description] Description of the error (optional)
 * @returns {Function}
 */
 const validation = require('../validation')
 module.exports = function(passedErrors) {
   let errors = []
   //Mongoose Validation Errors
   if (validation.types.isObject(passedErrors) && passedErrors.errors) {
     Object.keys(passedErrors.errors).forEach(function(key) {
       if (passedErrors.errors[key].message) {
          errors.push(passedErrors.errors[key].message)
       }
     })
   } else if (validation.types.isString(passedErrors)) {
     errors.push(passedErrors)
   } else {
     console.dir(passedErrors)
     errors.push("Something went wrong.")
   }
   return errors
 }
