const chai = require('chai')
const assert = chai.assert

const validation = require('../../../../app/util/validation')

describe('util/validation/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(validation)
  })
  it('Returned object should contain dateTime object', function() {
    assert.isObject(validation.dateTime)
  })
  it('Returned object should contain specialStrings object', function() {
    assert.isObject(validation.specialStrings)
  })
  it('Returned object should contain types object', function() {
    assert.isObject(validation.types)
  })
})
