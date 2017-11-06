const chai = require('chai')
const assert = chai.assert

const errors = require('../../../../app/util/errors')
const parse = errors.parse

describe('util/errors/parse.js', function() {
  it('Should return an function', function() {
    assert.isFunction(parse)
  })
  it('Passing an error in Mongoose error format will put the message into an array', function() {
    const testErrors = {
      errors: {
        error1: {
          message: "Test Message"
        },
        error2: {
          message: "Test Message"
        }
      }
    }
    const parsedErrors = parse(testErrors)
    assert.isArray(parsedErrors)
    assert.equal(parsedErrors[0], "Test Message")
  })
  it('Passing an unknown error will push an unknown message', function() {
    const testError = {errorTestType: "trsdt"}
    const parsedError = parse(testError)
    assert.equal(parsedError[0], "Something went wrong.")
  })
})
