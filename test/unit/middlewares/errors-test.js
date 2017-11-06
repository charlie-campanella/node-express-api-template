const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

const sinonExpressMock = require('sinon-express-mock')
const mockReq = sinonExpressMock.mockReq
const mockRes = sinonExpressMock.mockRes

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const errors = require('../../../app/middlewares/errors')

describe('middlewares/errors.js', function() {

  it('Should return a function', function() {
    assert.isFunction(errors)
  })

  it('Should call next() if no errors are found', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    errors()(null, req, res, next)
    expect(next).to.be.called
  })

})
