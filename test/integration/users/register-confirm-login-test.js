const environment = require('../../../app/environment.js')
const app = environment.app
const chai = require('chai')
const assert = chai.assert
const request = require('supertest')

const User = require('../../../app/classes/user')
const util = require('../../../app/util')

const generateData = function() {
  return {
    accountType: "business",
    fullName: "John Doe",
    emailAddress: "john" + util.helpers.general.generateRandomNumber(10) + "@doe.com",
    password: "password12345"
  }
}

const validData = generateData()

describe('Integration Test: User Registration', function() {
  it('Registration occurs via POST request', function(done) {
    request(app).get('/user/register')
      .expect(200)
      .expect({
        status: "error",
        data: {
          message: "Unauthorized Request"
        }
      }, done)
  })

  it('Registration fails with no specified account type', function(done) {
    let data = generateData()
    data["accountType"] = ""
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Account Type is required"]
        }
      }, done)
  })

  it('Registration fails with invalid account type', function(done) {
    let data = generateData()
    data["accountType"] = "invalid"
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Invalid Account Type specified"]
        }
      }, done)
  })

  it('Registration fails with admin account type', function(done) {
    let data = generateData()
    data["accountType"] = "admin"
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Invalid Account Type specified"]
        }
      }, done)
  })

  it('Registration fails with no full name', function(done) {
    let data = generateData()
    data["fullName"] = ""
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Full Name is required"]
        }
      }, done)
  })

  it('Registration fails with long full name', function(done) {
    let data = generateData()
    let longName = ""
    for(var i = 0; i < 100; i++) {
      longName = longName + "i"
    }
    data["fullName"] = longName
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Full Name must be between 1 and 50 characters in length"]
        }
      }, done)
  })

  it('Registration fails with no email address', function(done) {
    let data = generateData()
    data["emailAddress"] = ""
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Email Address is required"]
        }
      }, done)
  })

  it('Registration fails with invalid email address format', function(done) {
    let data = generateData()
    data["emailAddress"] = "test"
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Invalid Email Address format"]
        }
      }, done)
  })

  it('Registration fails with no password', function(done) {
    let data = generateData()
    data["password"] = ""
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Password is required"]
        }
      }, done)
  })

  it('Registration fails with short password', function(done) {
    let data = generateData()
    data["password"] = "a"
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Password must be between 10 and 25 characters in length"]
        }
      }, done)
  })

  it('Registration fails with long password', function(done) {
    let data = generateData()
    let longPass = ""
    for(var i = 0; i < 100; i++) {
      longPass = longPass + "i"
    }
    data["password"] = longPass
    request(app).post('/user/register')
      .send(data)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Password must be between 10 and 25 characters in length"]
        }
      }, done)
  })

  it('Registration succeeds with valid account data', function(done) {
    request(app).post('/user/register')
      .send(validData)
      .expect(200)
      .expect({
        status: "success",
        data: {
          message: "Registered successfully!"
        }
      }, done)
  })

  it('Registration fails when using the same email address', function(done) {
    request(app).post('/user/register')
      .send(validData)
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: ["Email Address is already in use"]
        }
      }, done)
  })

})

describe('Integration Test: User Confirmation', function() {

  it('Confirmation fails with invalid code', function(done) {
    request(app).post('/user/confirm')
      .send({
        emailAddress: validData.emailAddress,
        confirmationCode: util.helpers.general.generateRandomNumber(5)
      })
      .expect(200)
      .expect({
        status: "fail",
        data: {
          message: "Invalid email address or confirmation code"
        }
      }, done)
  })

  it('Confirmation succeeds with valid code', function(done) {
    let UserCode = new User({emailAddress: validData.emailAddress})
    UserCode.fetch().then(function(userData) {
      request(app).post('/user/confirm')
        .send({
          emailAddress: validData.emailAddress,
          confirmationCode: userData.auth.confirmation.code
        })
        .expect(200)
        .expect({
          status: "success",
          data: {
            message: "Account confirmed!"
          }
        }, done)
    })
  })

})

describe('Integration Test: User Login', function() {
  it('Login succeeds with valid data', function(done) {
    request(app).post('/user/login')
      .send({
        emailAddress: validData.emailAddress,
        password: validData.password
      })
      .expect(200)
      .end(function(err, res) {
        assert.isObject(res.body)
        assert.equal(res.body.status, "success")
        assert.isObject(res.body.data)
        assert.isString(res.body.data.message)
        assert.isString(res.body.data.token)
        done()
      })
  })
  it('Login fails with invalid data', function(done) {
    request(app).post('/user/login')
      .send({
        emailAddress: "a" + validData.emailAddress,
        password: validData.password
      })
      .expect(200)
      .end(function(err, res) {
        assert.isObject(res.body)
        assert.equal(res.body.status, "fail")
        assert.isObject(res.body.data)
        assert.isString(res.body.data.message)
        assert.equal(res.body.data.message, "Invalid email address or password")
        assert.isUndefined(res.body.data.token)
        done()
      })
  })
})
