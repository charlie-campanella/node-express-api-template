const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')

const helpers = require('../../../../app/util/helpers')

const validation = require('../../../../app/util/validation')
const dateTime = validation.dateTime

describe('util/validation/dateTime.js', function() {
  it('dateTime.isTimeStamp() - Returns false if string is not passed', function() {
    assert.isFalse(dateTime.isTimeStamp(1234567890))
  })
  it('dateTime.isTimeStamp() - Returns false if number string is not 10 characters', function() {
    assert.isFalse(dateTime.isTimeStamp("123456789"))
  })
  it('dateTime.isTimeStamp() - Returns false if number string contains a non-numeric character', function() {
    assert.isFalse(dateTime.isTimeStamp("123456789z"))
  })
  it('dateTime.isTimeStamp() - Returns true if valid timestamp string is passed', function() {
    assert.isTrue(dateTime.isTimeStamp("1234567890"))
  })
  it('dateTime.isTimeStamp() - Returns true if util.helpers.general.currentUnixTime() is passed', function() {
    assert.isTrue(dateTime.isTimeStamp(helpers.general.currentUnixTime()))
  })
})
