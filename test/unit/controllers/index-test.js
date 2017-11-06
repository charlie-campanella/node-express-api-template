const chai = require('chai')
const assert = chai.assert

const controllers = require('../../../app/controllers')

describe('controllers/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(controllers)
  })
  it('Returned object should contain users object', function() {
    assert.isObject(controllers.users)
  })
})
