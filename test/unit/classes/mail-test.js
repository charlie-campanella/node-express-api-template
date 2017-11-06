const chai = require('chai')
const assert = chai.assert

const Mail = require('../../../app/classes/mail')

describe('classes/mail.js', function() {
  it('Should return an function (class)', function() {
    assert.isFunction(Mail)
  })

  it('Constructor throws error if from argument is not provided', function() {
    assert.throws(function() {
      let TestMail = new Mail()
    }, Error, "from must be a string")
  })
  it('Constructor throws error if from argument is not a string', function() {
    assert.throws(function() {
      let TestMail = new Mail(1)
    }, Error, "from must be a string")
  })

  it('Constructor throws error if to argument is not provided', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com")
    }, Error, "to must be a string")
  })
  it('Constructor throws error if to argument is not a string', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com", 1)
    }, Error, "to must be a string")
  })

  it('Constructor throws error if subject argument is not provided', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com", "test@test.com")
    }, Error, "subject must be a string")
  })
  it('Constructor throws error if subject argument is not a string', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com", "test@test.com", 123)
    }, Error, "subject must be a string")
  })

  it('Constructor throws error if content argument is not provided', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com", "test@test.com", "Test")
    }, Error, "content must be a string")
  })
  it('Constructor throws error if content argument is not a string', function() {
    assert.throws(function() {
      let TestMail = new Mail("test@test.com", "test@test.com", "Test", 123)
    }, Error, "content must be a string")
  })

  it('Constructor does not throw error if all passed arguments are valid', function() {
    assert.doesNotThrow(function() {
      let TestMail = new Mail("test@test.com", "test@test.com", "Test", "Test")
    }, Error)
  })

  it('Constructor does not throw error if all passed arguments are valid', function() {
    assert.doesNotThrow(function() {
      let TestMail = new Mail("test@test.com", "test@test.com", "Test", "Test")
    }, Error)
  })

  it('Mail.send() - Resolves with all valid arguments', function(done) {
    let TestMail = new Mail("test@test.com", "test@test.com", "Test", "Test")
    TestMail.send().then(function(message) {
      assert.equal(message, "Sent!")
      done()
    })
  })

})
