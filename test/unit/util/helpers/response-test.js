const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const helpers = require('../../../../app/util/helpers')
const response = helpers.response

describe('util/helpers/response.js', function() {
  it('helpers.response should be a function', function() {
    assert.isFunction(response)
  })

  it('helpers.response() - Throws error without res object passed', function() {
    assert.throws(function() {
      response()
    }, Error, "res object is required")
  })
  it('helpers.response() - Throws error with invalid res object passed', function() {
    const res = {}
    assert.throws(function() {
      response(res)
    }, Error, "res.send must be a function")
  })
  it('helpers.response() - Throws error with no status passed', function() {
    const res = {send: function() {}}
    assert.throws(function() {
      response(res)
    }, Error, "Invalid status specified")
  })
  it('helpers.response() - Does not throw error when status type is success, fail, or error', function() {
    const res = {send: function() {}}
    assert.doesNotThrow(function() {
      response(res, "success")
    }, Error, "Invalid status specified")
    assert.doesNotThrow(function() {
      response(res, "fail")
    }, Error, "Invalid status specified")
    assert.doesNotThrow(function() {
      response(res, "error")
    }, Error, "Invalid status specified")
  })
  it('helpers.response() - Passed data must be an object', function() {
    const res = {send: function() {}}
    assert.throws(function() {
      response(res, "success")
    }, Error, "data must be an object")
  })
  it('helpers.response() - Calls res.send({status: "status", data: {object}}) upon success', function() {
    const res = {send: function() {}}
    let spy = sinon.spy(res, 'send')
    response(res, "success", {message: "Test message"})
    spy.calledWith({status: "success", data: {message: "Test message"}})
  })
})
