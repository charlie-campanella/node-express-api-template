const chai = require('chai')
const assert = chai.assert

const errors = require('../../../../app/util/errors')
const fatal = errors.fatal

describe('util/errors/fatal.js', function() {
  it('Should return an function', function() {
    assert.isFunction(fatal)
  })
  it('Passing a non-string description will return an error', function() {
    assert.throws(function() {
      fatal(1)
    }, Error, "description must be a string")
  })
  it('Passing a string description will throw an error with the description', function() {
    const description = "Test Description"
    assert.throws(function() {
      fatal(description)
    }, Error, description)
  })
})
