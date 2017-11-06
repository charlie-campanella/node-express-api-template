/**
 * @module controllers/users/confirm
 * @description Controller that allows users to confirm their account by entering their email address and confirmation code
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
  const confirmationCode = req.body.confirmationCode || null
  User.confirm({
    emailAddress,
    confirmationCode
  }).then(function(response) {
    return util.helpers.response(res, "success", {
      message: response
    })
  }).catch(function(err) {
    return util.helpers.response(res, "fail", {
      message: err
    })
  })
}
