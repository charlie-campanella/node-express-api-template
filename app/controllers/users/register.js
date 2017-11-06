/**
 * @module controllers/users/register
 * @description Controller that allows users to create a new account
 * @requires classes/user
 * @requires classes/mail
 * @requires config
 * @requires util
 * @returns {Function}
 */

/* Custom Dependencies */
const config = require('../../config')
const Mail = require('../../classes/mail')
const User = require('../../classes/user')
const util = require('../../util')

module.exports = function(req, res) {
  const accountType = req.body.accountType || null
  const fullName = req.body.fullName || null
  const emailAddress = req.body.emailAddress || null
  const password = req.body.password || null
  User.register({
    accountType,
    fullName,
    emailAddress,
    password
  }).then(function(createdUser) {
    var ConfirmationEmail = new Mail("noreply@" + config.constants.mail.domain, emailAddress, "Confirmation Code", "Confirm your account!")
    ConfirmationEmail.send().then(function() {
      return util.helpers.response(res, "success", {
        message: "Registered successfully!"
      })
    }).catch(function(err) {
      util.errors.log(err)
      return util.helpers.response(res, "fail", {
        message: "Account created, but confirmation email could not be sent. Use a different email address or contact us."
      })
    })
  }).catch(function(err) {
    return util.helpers.response(res, "fail", {
      message: util.errors.parse(err)
    })
  })
}
