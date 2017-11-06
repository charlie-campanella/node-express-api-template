const chai = require('chai')
const assert = chai.assert

const users = require('../../../../app/controllers/users')

describe('controllers/users/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(users)
  })
  it('Returned object should contain register function', function() {
    assert.isFunction(users.register)
  })
  it('Returned object should contain confirm function', function() {
    assert.isFunction(users.confirm)
  })
})
