/**
 * @module classes/mail
 * @description Contains a class that provides an interface for sending emails. Powered by MailGun.
 * @requires config
 * @requires util
 * @returns {Class} Mail class
 */
/* Custom Dependencies */
const config = require('../config')
const util = require('../util')
/* Third Party Dependencies */
const mailgun = require('mailgun-js')({apiKey: config.constants.mail.private_key, domain: config.constants.mail.domain})
/**
 * Mail class provides an interface for sending emails. Powered by MailGun.
 * @class Mail
 */
class Mail {
  constructor(from, to, subject, content) {
    this.from = from
    this.to = to
    this.subject = subject
    this.content = content

    if (!this.from || !util.validation.types.isString(from)) {
      return util.errors.fatal("from must be a string")
    } else if (!this.to || !util.validation.types.isString(to)) {
      return util.errors.fatal("to must be a string")
    } else if (!this.subject || !util.validation.types.isString(subject)) {
      return util.errors.fatal("subject must be a string")
    } else if (!this.content || !util.validation.types.isString(content)) {
      return util.errors.fatal("content must be a string")
    }
  }
 /**
  * Sends an email to the specified user
  * @static
  * @returns {Promise}
  */
  send() {
    const that = this
    return new Promise(function(resolve, reject) {
      var data = {
        from: config.constants.developer_name + '<' + that.from + '>',
        to: that.to,
        subject: that.subject,
        html: that.content
      }
      if (config.constants.env !== 'production') { //Only send emails while in production
        resolve("Sent!")
      }
      mailgun.messages().send(data, function(error, body) {
        if (error) {
          reject()
        }
        resolve("Sent!")
      })
    })
  }
}

module.exports = Mail
