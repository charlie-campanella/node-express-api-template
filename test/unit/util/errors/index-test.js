const chai = require('chai')
const assert = chai.assert

const errors = require('../../../../app/util/errors')

describe('util/errors/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(errors)
  })
  it('Returned object should contain fatal function', function() {
    assert.isFunction(errors.fatal)
  })
  it('Returned object should contain log function', function() {
    assert.isFunction(errors.log)
  })
  it('Returned object should contain parse function', function() {
    assert.isFunction(errors.parse)
  })
})
