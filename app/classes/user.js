/**
 * @module classes/user
 * @description Contains a class that provides an interface for interacting with users.
 * @requires config
 * @requires models/users
 * @requires util
 * @returns {Class} User class
 */
/* Third Party Dependencies */

/* Custom Dependencies */
const config = require('../config')
const userModel = require('../models/users')
const util = require('../util')
/**
 * User class that abstracts creating, updating, fetching, and deleting users
 * @class User
 */
class User {
  /**
   * User class constructor method.
   * @param {Object} [options] Object that contains user query information and other options
   */
  constructor(options) {
    this.options = options
     if (!options) {
       return util.errors.fatal("options must be defined")
     } else if (!options._id && !options.emailAddress) {
       return util.errors.fatal("options._id or options.emailAddress must be defined")
     } else if (options._id && options.emailAddress) {
       return util.errors.fatal("options._id and options.emailAddress cannot be defined at the same time")
     } else if (options._id && !util.validation.specialStrings.isObjectIdString(options._id)) {
       return util.errors.fatal("options._id must be a valid object id string")
     } else if (options.emailAddress && !util.validation.specialStrings.isEmailString(options.emailAddress)) {
       return util.errors.fatal("options.emailAddress must be a valid email address")
     }

     if (this.options._id) {
       this.query = {'_id': this.options._id}
     } else {
       this.query = {'auth.emailAddress': this.options.emailAddress}
     }

     this.data = null
  }
 /**
  * Creates new user
  * @static
  * @param {Object} data Data of new user
  * @returns {Promise}
  */
  static register(data) {
    return new Promise(function(resolve, reject) {
      if (!data || !util.validation.types.isObject(data)) {
        return reject("Invalid user data format")
      } else if (data.accountType === "admin") {
        return reject("Invalid Account Type specified")
      }
      let newUser = {
        fullName: data.fullName,
        permissions: {
          type: data.accountType
        },
        auth: {
          emailAddress: data.emailAddress,
          password: data.password
        }
      }
      userModel.create(newUser, function(err, createdUser) {
        if (err) {
          return reject(err)
        } else {
          return resolve(createdUser)
        }
      })
    })
  }
  /**
   * Allows a user to confirm their account. Required for login.
   * @static
   * @param {Object} data Data needed to confirm user
   * @returns {Promise}
   */
  static confirm(data) {
    return new Promise(function(resolve, reject) {
      if (!data || !util.validation.types.isObject(data)) {
        reject("Invalid confirmation data format")
        return
      } else if (!data.emailAddress || !util.validation.specialStrings.isEmailString(data.emailAddress)) {
        reject("Invalid emailAddress format")
        return
      } else if (!data.confirmationCode || !util.validation.types.isNumber(data.confirmationCode) || data.confirmationCode.toString().length > 10) {
        reject("Invalid confirmationCode format")
        return
      }
      userModel.findOne({
        'auth.emailAddress': data.emailAddress,
        'auth.confirmation.confirmed': false
      }, function(err, foundUser) {
        if (err) {
          reject("Something went wrong")
          return
        } else if (!foundUser) {
          reject("Invalid email address or confirmation code")
          return
        } else if (foundUser.auth.confirmation.failures >= 10) {
          reject("Too many failed confirmation attempts. Contact us to manually activate your account.")
          return
        } else if (foundUser.auth.confirmation.code !== data.confirmationCode) {
          userModel.update({_id: foundUser._id}, {$inc: {'auth.confirmation.failures': 1}}, function(err) {
            if (err) {
              return reject("Something went wrong")
            }
            return reject("Invalid email address or confirmation code")
          })
        } else {
          userModel.update({_id: foundUser._id}, {'auth.confirmation.confirmed': true}, function(err) {
            if (err) {
              return reject("Something went wrong")
            }
            return resolve("Account confirmed!")
          })
        }
      })
    })
  }
  /**
   * Queries user information by id or email address. Fetches the entire user object from the database, meaning that the response MUST be parsed before sending to the client.
   * @returns {Promise}
   */
   fetch() {
     const that = this
     return new Promise(function(resolve, reject) {
       userModel.findOne(that.query, function(err, result) {
         if (!result) {
           return reject("Could not fetch user")
         }
         that.data = result
         return resolve(result)
       })
     })
   }
   /**
    * Updates user data based on id or emailAddress
    * @returns {Promise}
    */
    update(newData) {
      const that = this
      if (!newData || !util.validation.types.isObject(newData)) {
        return util.errors.fatal("newData must be an object")
      }
      return new Promise(function(resolve, reject) {
        userModel.findOneAndUpdate(that.query, newData, function(err, result) {
          if (err) {
            return reject("Something went wrong")
          } else if (!result) {
            return reject("Could not update user")
          } else {
            return resolve(result)
          }
        })
      })
    }
   /**
    * Validates email address against a password and if valid, generates a JSON Web Token that can be used to authenticate subsequent requests to protected endpoints.
    * @returns {Promise}
    */
    login(password) {
      const that = this
      const genericMessage = "Invalid email address or password"
      return new Promise(function(resolve, reject) {
        if (!that.options.emailAddress) {
          return reject("Email Address is required")
        } else if (!password || !util.validation.types.isString(password)) {
          return reject("Password is required")
        }
        that.fetch()
        .then(function(userData) {
          let passwordHash = userData.auth.password
          let lastAuthAttempt = userData.auth.lastAuthAttempt
          if (parseInt(util.helpers.general.currentUnixTime()) - parseInt(lastAuthAttempt) < config.constants.users.authThrottleSeconds && config.constants.env !== "development") {
            return Promise.reject("You must wait " + config.constants.users.authThrottleSeconds + " seconds between login attempts")
          }
          return util.helpers.general.hashCompare(password, passwordHash)
        })
        .then(function(validPassword) {
          if (!validPassword) {
            return that.update({'auth.lastAuthAttempt': util.helpers.general.currentUnixTime()})
          }
          return
        })
        .then(function(fromPrevious) {
          if (fromPrevious) {
            return reject(genericMessage)
          }
          util.helpers.general.generateJsonWebToken({
            id: that.data._id, //that.fetch() sets that.data
            type: that.data.permissions.type,
            emailAddress: that.data.auth.emailAddress,
            fullName: that.data.fullName
          }, function(token) {
            return resolve(token)
          })
        })
        .catch(function(err) {
          console.dir(err)
          return reject(err)
        })

      })
    }

}

module.exports = User
