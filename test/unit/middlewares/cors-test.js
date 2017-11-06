const chai = require('chai')
const assert = chai.assert
const expect = chai.expect

const sinonExpressMock = require('sinon-express-mock')
const mockReq = sinonExpressMock.mockReq
const mockRes = sinonExpressMock.mockRes

const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

const cors = require('../../../app/middlewares/cors')

describe('middlewares/cors.js', function() {

  it('Should return a function', function() {
    assert.isFunction(cors)
  })

  it('Should set CORS related headers and then call next()', function() {
    const req = mockReq()
    const res = mockRes()
    const next = sinon.spy()
    cors()(req, res, next)
    expect(res.set).to.be.calledWith("Access-Control-Allow-Origin")
    expect(res.set).to.be.calledWith("Access-Control-Allow-Headers")
    expect(next).to.be.called
  })

})
