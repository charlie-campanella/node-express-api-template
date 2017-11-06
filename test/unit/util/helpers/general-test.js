const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')

const helpers = require('../../../../app/util/helpers')
const general = helpers.general

describe('util/helpers/general.js', function() {
  it('general.currentUnixTime() returns a string of numbers that increments by 1 every second', function() {
    let clock = sinon.useFakeTimers()
    const currentTime = general.currentUnixTime()
    assert.isString(currentTime)
    clock.tick(5000)
    const newTime = general.currentUnixTime()
    assert.equal(parseInt(newTime) - parseInt(currentTime), 5)
    clock.restore()
  })

  it('general.hash() fails without passed string', function() {
    general.hash().then(function() {
      //This won't be executed in this test
    }).catch(function(err) {
      assert.equal(err, "Invalid string")
    })
  })
  it('general.hash() returns hash string', function() {
    general.hash("password").then(function(hash) {
      assert.isString(hash)
    })
  })
  it('general.hash() - Hashing same string twice will lead to different hashes', function() {
    general.hash("password").then(function(result1) {
      general.hash("password").then(function(result2) {
        assert.isString(result1)
        assert.isString(result2)
        assert.notEqual(result1, result2)
      })
    })
  })

  it('general.generateRandomNumber() - Returns a number', function() {
    assert.isNumber(general.generateRandomNumber())
  })
  it('general.generateRandomNumber() - Returns a number with a number of digits equal to the passed length', function() {
    assert.equal(general.generateRandomNumber(5).toString().length, 5)
    assert.equal(general.generateRandomNumber(10).toString().length, 10)
  })
  it('general.generateRandomNumber() - Generated numbers of same length will not be the same', function() {
    assert.notEqual(general.generateRandomNumber(10), general.generateRandomNumber(10))
  })
})
