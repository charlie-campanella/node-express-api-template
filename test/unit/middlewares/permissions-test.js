const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

const sinonExpressMock = require('sinon-express-mock')
const mockReq = sinonExpressMock.mockReq
const mockRes = sinonExpressMock.mockRes

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const permissions = require('../../../app/middlewares/permissions')

describe('middlewares/permissions.js', function() {

  it('Should return a function', function() {
    assert.isFunction(permissions)
  })

  it('Throws error if permissions is not passed as an array', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    assert.throws(function() {
      permissions(true)(req, res, next)
    }, Error, "permissions must be an array")
  })

  it('Throws error if permissions array is empty', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    assert.throws(function() {
      permissions([])(req, res, next)
    }, Error, "permissions array must contain values")
  })

  it('Throws error if invalid permission type is passed', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    assert.throws(function() {
      permissions(['invalidd'])(req, res, next)
    }, Error, "Invalid permission type: invalidd")
  })

  it('Does not throw error if valid permission type is passed', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    assert.doesNotThrow(function() {
      permissions(['open'])(req, res, next)
    }, Error, "Invalid permission type: invalidd")
  })

  it('next() is called if open permission is passed', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    permissions(['open'])(req, res, next)
    expect(next).to.be.called
  })

  it('Throws error if req.AUTHORIZED_USER does not exist and permissions are NOT open', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    assert.throws(function() {
      permissions(['admin'])(req, res, next)
    }, Error, "req.AUTHORIZED_USER was not found. Non-public endpoints require auth() middleware function to be called first.")
  })

  it('Response indicating inability to access endpoint is thrown when req.AUTHORIZED_USER.type is not a valid permission', function() {
    const req = mockReq({
      AUTHORIZED_USER: {
        type: 'invalidd'
      }
    })
    const res = mockRes()
    const next = sinon.spy()
    permissions(['admin'])(req, res, next)
    expect(res.send).to.be.calledWith({status: "error", data: {message: "You do not have permission to access this endpoint."}})
  })

})
