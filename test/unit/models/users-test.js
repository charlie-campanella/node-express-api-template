const chai = require('chai')
const assert = chai.assert

const config = require('../../../app/config')
const userModel = require('../../../app/models/users')
const util = require('../../../app/util')

describe('models/users.js', function() {
  it("Exported modal should be a function", function(done) {
    assert.isFunction(userModel)
    done()
  })
})
