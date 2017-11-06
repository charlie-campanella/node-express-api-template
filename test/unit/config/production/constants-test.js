const chai = require('chai')
const assert = chai.assert

const constants = require('../../../../app/config/production/constants')

describe('config/production/constants.js', function() {
  it('Should return an object', function() {
    assert.isObject(constants)
  })
  it('Constants file defines app_name', function() {
    assert.isString(constants.app_name)
  })
  it('Constants file defines developer_name', function() {
    assert.isString(constants.developer_name)
  })
  it('Constants file defines app_name', function() {
    assert.isString(constants.app_name)
  })
  it('Constants file has server configuration object', function() {
    assert.isObject(constants.server)
  })
  it('Constants file defines server.port', function() {
    assert.isNumber(constants.server.port)
  })
  it('Constants file has server.db configuration object for database', function() {
    assert.isObject(constants.server.db)
  })
  it('Constants file defines server.db.host which comes from process.env', function() {
    assert.isString(constants.server.db.host)
    assert.equal(constants.server.db.host, process.env.DB_HOST)
  })
  it('Constants file defines server.db.name which comes from process.env', function() {
    assert.isString(constants.server.db.name)
    assert.equal(constants.server.db.name, process.env.DB_NAME)
  })
  it('Constants file defines server.db.user which comes from process.env', function() {
    assert.isString(constants.server.db.user)
    assert.equal(constants.server.db.user, process.env.DB_USER)
  })
  it('Constants file defines server.db.password which comes from process.env', function() {
    assert.isString(constants.server.db.password)
    assert.equal(constants.server.db.password, process.env.DB_PASSWORD)
  })
  it('Constants file has server.encryption configuration object for holding secret keys', function() {
    assert.isObject(constants.server.encryption)
  })
  it('Constants file has server.encryption.jwtSecret', function() {
    assert.isString(constants.server.encryption.jwtSecret)
  })
  it('Constants file has server.throttle configuration object for IP throttles', function() {
    assert.isObject(constants.server.throttle)
  })
  it('Constants file has server.throttle.periodMinutes', function() {
    assert.isNumber(constants.server.throttle.periodMinutes)
  })
  it('Constants file has server.throttle.periodRequestLimit', function() {
    assert.isNumber(constants.server.throttle.periodRequestLimit)
  })
  it('Constants file has mail configuration object', function() {
    assert.isObject(constants.mail)
  })
  it('Constants file defines mail.provider', function() {
    assert.isString(constants.mail.provider)
  })
  it('Constants file defines mail.domain', function() {
    assert.isString(constants.mail.domain)
  })
  it('Constants file defines mail.private_key from process.env', function() {
    assert.isString(constants.mail.private_key)
    assert.equal(constants.mail.private_key, process.env.MAILGUN_PRIVATE_KEY)
  })
  it('Constants file defines mail.public_key from process.env', function() {
    assert.isString(constants.mail.public_key)
    assert.equal(constants.mail.public_key, process.env.MAILGUN_PUBLIC_KEY)
  })
  it('Constants file has user configuration object', function() {
    assert.isObject(constants.users)
  })
  it('Constants file defines users.types as an array of strings', function() {
    assert.isArray(constants.users.types)
    for(var i = 0; i < constants.users.types.length; i++) {
      assert.isString(constants.users.types[i])
    }
  })
  it('Constants file defines users.sessionLength as number', function() {
    assert.isNumber(constants.users.sessionLength)
  })
  it('Constants file defines users.authThrottleSeconds as number', function() {
    assert.isNumber(constants.users.authThrottleSeconds)
  })
})
