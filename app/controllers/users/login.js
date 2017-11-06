/**
 * @module controllers/users/login
 * @description Controller that allows users to sign in using their email address and password. Provides a JWT that can be used to authenticate subsequent requests to private endpoints
 * @requires classes/user
 * @requires config
 * @requires util
 * @returns {Function}
 */

/* Custom Dependencies */
const config = require('../../config')
const User = require('../../classes/user')
const util = require('../../util')

module.exports = function(req, res) {
  const emailAddress = req.body.emailAddress || null
  const password = req.body.password || null
  if (!emailAddress || !util.validation.specialStrings.isEmailString(emailAddress)) { //Otherwise LoginUser will throw err
    return util.helpers.response(res, "fail", {
      message: "Invalid email address or password"
    })
  }
  let LoginUser = new User({emailAddress: emailAddress})
  LoginUser.login(password).then(function(token) {
    return util.helpers.response(res, "success", {
      message: "Logged In!",
      token: token
    })
  }).catch(function(message) {
    return util.helpers.response(res, "fail", {
      message: "Invalid email address or password"
    })
  })
}
