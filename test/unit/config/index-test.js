const chai = require('chai')
const assert = chai.assert

process.env.NODE_ENV = "development"
const config = require('../../../app/config')

describe('config/index.js', function() {
  it('Should return an object', function() {
    assert.isObject(config)
  })
  it('Should return a constants object', function() {
    assert.isObject(config.constants)
  })
})
