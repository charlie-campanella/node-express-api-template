const chai = require('chai')
const assert = chai.assert

const helpers = require('../../../../app/util/helpers')

describe('util/helpers/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(helpers)
  })
  it('Returned object should contain general object', function() {
    assert.isObject(helpers.general)
  })
  it('Returned object should contain response function', function() {
    assert.isFunction(helpers.response)
  })
})
