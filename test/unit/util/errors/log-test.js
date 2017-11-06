const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)

const errors = require('../../../../app/util/errors')
const log = errors.log

describe('util/errors/log.js', function() {
  it('Should return an function', function() {
    assert.isFunction(log)
  })
  it('Passing a non-string description will return an error', function() {
    assert.throws(function() {
      log(1)
    }, Error, "description must be a string")
  })
  it('Passing a string description will log WARNING: <description> to the console', function() {
    const description = "Test Description"
    let spy = sinon.spy(console, 'log');
    log(description);
    assert(spy.calledWith("WARNING: " + description))
    spy.restore()
  })
})
