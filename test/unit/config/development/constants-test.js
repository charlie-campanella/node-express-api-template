const chai = require('chai')
const assert = chai.assert

const constants = require('../../../../app/config/development/constants')
const constantsProd = require('../../../../app/config/production/constants')

describe('config/development/constants.js', function() {
  it('Should return an object', function() {
    assert.isObject(constants)
  })
  it('Should return same values as production configuration file (subject to change)', function() {
    assert.equal(constants.app_name, constantsProd.app_name)
    assert.equal(constants.developer_name, constantsProd.developer_name)
  })
})
