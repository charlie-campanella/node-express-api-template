const chai = require('chai')
const assert = chai.assert

const util = require('../../../app/util')

describe('util/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(util)
  })
  it('Returned object should contain errors object', function() {
    assert.isObject(util.errors)
  })
  it('Returned object should contain helpers object', function() {
    assert.isObject(util.helpers)
  })
  it('Returned object should contain validation object', function() {
    assert.isObject(util.validation)
  })
})
