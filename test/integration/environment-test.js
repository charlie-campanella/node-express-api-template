const environment = require('../../app/environment.js')
const app = environment.app
const chai = require('chai')
const assert = chai.assert
const request = require('supertest')

const util = require('../../app/util')

describe('Integration Test: Environment', function() {
  it('GET requests to undefined endpoints should return return an unauthorized error response', function(done) {
    request(app).get('/')
      .expect(200)
      .expect({
        status: "error",
        data: {
          message: "Unauthorized Request"
        }
      }, done)
  })
  it('POST requests to undefined endpoints should return return an unauthorized error response', function(done) {
    request(app).post('/')
      .expect(200)
      .expect({
        status: "error",
        data: {
          message: "Unauthorized Request"
        }
      }, done)
  })
})
