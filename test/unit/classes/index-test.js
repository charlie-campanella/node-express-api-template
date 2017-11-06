const chai = require('chai')
const assert = chai.assert

const classes = require('../../../app/classes')

describe('classes/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(classes)
  })
  it('Should return a mail function (class)', function() {
    assert.isFunction(classes.mail)
  })
  it('Should return a user function (class)', function() {
    assert.isFunction(classes.user)
  })
})
