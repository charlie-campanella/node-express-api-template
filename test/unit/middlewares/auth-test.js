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

const auth = require('../../../app/middlewares/auth')
const config = require('../../../app/config')

describe('middlewares/auth.js', function() {

  it('Should return a function', function() {
    assert.isFunction(auth)
  })

  it('Should send an error response if no authorization header is sent', function() {
    const request = {
      headers: {},
      body: {}
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
    auth()(req, res, next)
    expect(res.send).to.be.calledWith({status: "error", data: {message: "Authorization header is required"}})
  })

  it('Should send an error response if no authorization header is in invalid format', function() {
    const request = {
      headers: {
        authorization: "bad format"
      },
      body: {}
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
    auth()(req, res, next)
    expect(res.send).to.be.calledWith({status: "error", data: {message: "Authorization header value must follow the Bearer <token> format"}})
  })

  it('Should send an failure response if the authorization token is incorrect', function() {
    const request = {
      headers: {
        authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MDc0MzEyODQsImV4cCI6MTUzODk2NzI4MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.axWpUtzwyboIEGI-OeJjZlzd2Yh5TWiXk20u8RaSgtE"
      },
      body: {}
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
    auth()(req, res, next)
    expect(res.send).to.be.calledWith({status: "fail", data: {auth_failure: true, message: "Invalid JWT submitted"}})
  })

  it('Should move onto next() call if valid token is passed', function() {
    let token = jwt.sign({test:'bar'}, config.constants.server.encryption.jwtSecret)
    const request = {
      headers: {
        authorization: "Bearer " + token
      },
      body: {}
    }
    const req = mockReq(request)
    const res = mockRes()
    const next = sinon.spy()
    auth()(req, res, next)
    expect(next).to.be.called
  })

})
