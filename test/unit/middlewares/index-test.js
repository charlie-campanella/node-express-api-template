const chai = require('chai')
const assert = chai.assert

const middlewares = require('../../../app/middlewares')

describe('middlewares/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(middlewares)
  })
  it('Returned object should contain auth function', function() {
    assert.isFunction(middlewares.auth)
  })
  it('Returned object should contain cors function', function() {
    assert.isFunction(middlewares.cors)
  })
  it('Returned object should contain errors function', function() {
    assert.isFunction(middlewares.errors)
  })
  it('Returned object should contain permissions function', function() {
    assert.isFunction(middlewares.permissions)
  })
})
