const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

const sinonExpressMock = require('sinon-express-mock')
const mockReq = sinonExpressMock.mockReq
const mockRes = sinonExpressMock.mockRes

const jwt = require('jsonwebtoken')

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const register = require('../../../../app/controllers/users/register')

describe('controllers/users/register.js', function() {
  it('Should return a function', function() {
    assert.isFunction(register)
  })
  //Rest will be conducted in integration tests.. for now.
})
