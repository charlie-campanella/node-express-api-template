const chai = require('chai')
const assert = chai.assert

const validation = require('../../../../app/util/validation')
const types = validation.types

describe('util/validation/specialStrings.js', function() {
  /* types.isArray() Tests */
  it('types.isArray() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isArray())
  })
  it('types.isArray() - Returns false if string is passed', function() {
    assert.isFalse(types.isArray("string"))
  })
  it('types.isArray() - Returns false if number is passed', function() {
    assert.isFalse(types.isArray(1))
  })
  it('types.isArray() - Returns false if object is passed', function() {
    assert.isFalse(types.isArray({test: "test", test2: 1}))
  })
  it('types.isArray() - Returns false if function is passed', function() {
    assert.isFalse(types.isArray(function() {
      console.log("very bad if this returns true")
    }))
  })
  it('types.isArray() - Returns true if empty array is passed', function() {
    assert.isTrue(types.isArray([]))
  })
  it('types.isArray() - Returns true if array is passed', function() {
    assert.isTrue(types.isArray(['test', 'testing']))
  })
  it('types.isArray() - Returns true if array of objects is passed', function() {
    assert.isTrue(types.isArray([{test: 123}, {test: 1235}]))
  })

  /* types.isInarray() Tests */
  it('types.isInArray() - Throws error without needle', function() {
    assert.throws(function() {
      types.isInArray()
    }, Error, "needle must be defined")
  })
  it('types.isInArray() - Does not throw error when needle is null', function() {
    assert.doesNotThrow(function() {
      types.isInArray(null)
    }, Error, "needle must be defined")
  })
  it('types.isInArray() - Throws error without haystack', function() {
    assert.throws(function() {
      types.isInArray("needle")
    }, Error, "haystack must be an array")
  })
  it('types.isInArray() - Throws error if haystack is not an array', function() {
    assert.throws(function() {
      types.isInArray("needle", "bad haystack")
    }, Error, "haystack must be an array")
  })
  it('types.isInArray() - Returns false if empty array is passed', function() {
    assert.isFalse(types.isInArray("needle", []))
  })
  it('types.isInArray() - Returns true if haystack contains needle', function() {
    assert.isTrue(types.isInArray("needle", ["needle"]))
  })
  it('types.isInArray() - Returns true if haystack contains needle more than once', function() {
    assert.isTrue(types.isInArray("needle", ["needle", "needle", "needle"]))
  })

  /* types.isBoolean() Tests */
  it('types.isBoolean() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isBoolean())
  })
  it('types.isBoolean() - Returns false if string is passed', function() {
    assert.isFalse(types.isBoolean("string"))
  })
  it('types.isBoolean() - Returns false if number is passed', function() {
    assert.isFalse(types.isBoolean(1))
  })
  it('types.isBoolean() - Returns false if object is passed', function() {
    assert.isFalse(types.isBoolean({test: "test", test2: 1}))
  })
  it('types.isBoolean() - Returns false if function is passed', function() {
    assert.isFalse(types.isBoolean(function() {
      console.log("very bad if this returns true")
    }))
  })
  it('types.isBoolean() - Returns true if true boolean is passed', function() {
    assert.isTrue(types.isBoolean(true))
  })
  it('types.isBoolean() - Returns true if false boolean is passed', function() {
    assert.isTrue(types.isBoolean(false))
  })

  /* types.isBooleanTrue() Tests */
  it('types.isBooleanTrue() - Throws error if non-boolean is passed', function() {
    assert.throws(function() {
      types.isBooleanTrue("string")
    }, Error, "input must be a boolean")
  })
  it('types.isBooleanTrue() - Returns true if true boolean is passed', function() {
    assert.isTrue(types.isBooleanTrue(true))
  })
  it('types.isBooleanTrue() - Returns false if false boolean is passed', function() {
    assert.isFalse(types.isBooleanTrue(false))
  })

  /* types.isFunction() Tests */
  it('types.isFunction() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isFunction())
  })
  it('types.isFunction() - Returns false if string is passed', function() {
    assert.isFalse(types.isFunction("string"))
  })
  it('types.isFunction() - Returns false if number is passed', function() {
    assert.isFalse(types.isFunction(1))
  })
  it('types.isFunction() - Returns false if object is passed', function() {
    assert.isFalse(types.isFunction({test: "test", test2: 1}))
  })
  it('types.isFunction() - Returns true if function is passed', function() {
    assert.isTrue(types.isFunction(function() {
      console.log("very good if this returns true")
    }))
  })

  /* types.isNumber() Tests */
  it('types.isNumber() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isNumber())
  })
  it('types.isNumber() - Returns false if string is passed', function() {
    assert.isFalse(types.isNumber("string"))
  })
  it('types.isNumber() - Returns false if object is passed', function() {
    assert.isFalse(types.isNumber({test: "test", test2: 1}))
  })
  it('types.isNumber() - Returns false if function is passed', function() {
    assert.isFalse(types.isNumber(function() {
      console.log("very bad if this returns true")
    }))
  })
  it('types.isNumber() - Returns true if number is passed', function() {
    assert.isTrue(types.isNumber(1))
  })

  /* types.isObject() Tests */
  it('types.isObject() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isObject())
  })
  it('types.isObject() - Returns false if string is passed', function() {
    assert.isFalse(types.isObject("string"))
  })
  it('types.isObject() - Returns true if object is passed', function() {
    assert.isTrue(types.isObject({test: "test", test2: 1}))
  })
  it('types.isObject() - Returns false if function is passed', function() {
    assert.isFalse(types.isObject(function() {
      console.log("very bad if this returns true")
    }))
  })
  it('types.isObject() - Returns false if number is passed', function() {
    assert.isFalse(types.isObject(1))
  })

  /* types.isString() Tests */
  it('types.isString() - Returns false if nothing is passed', function() {
    assert.isFalse(types.isString())
  })
  it('types.isString() - Returns true if string is passed', function() {
    assert.isTrue(types.isString("string"))
  })
  it('types.isString() - Returns false if object is passed', function() {
    assert.isFalse(types.isString({test: "test", test2: 1}))
  })
  it('types.isString() - Returns false if function is passed', function() {
    assert.isFalse(types.isString(function() {
      console.log("very bad if this returns true")
    }))
  })
  it('types.isString() - Returns false if number is passed', function() {
    assert.isFalse(types.isString(1))
  })

  /* types.isStringWithinLength() Tests */
  it('types.isStringWithinLength() - Throws error if non-string is passed', function() {
    assert.throws(function() {
      types.isStringWithinLength(1, 0, 20)
    }, Error, "string must be a string")
  })
  it('types.isStringWithinLength() - Throws error if minimum length is negative', function() {
    assert.throws(function() {
      types.isStringWithinLength("string", -1, 20)
    }, Error, "minimum must be a positive number")
  })
  it('types.isStringWithinLength() - Throws error if maximum length is negative', function() {
    assert.throws(function() {
      types.isStringWithinLength("string", 1, -20)
    }, Error, "maximum must be a positive number")
  })
  it('types.isStringWithinLength() - Throws error if minimum is greater than maximum', function() {
    assert.throws(function() {
      types.isStringWithinLength("string", 10, 8)
    }, Error, "maximum must be greater than minimum")
  })
  it('types.isStringWithinLength() - Returns false if string is too short', function() {
    assert.isFalse(types.isStringWithinLength("test", 5, 10))
  })
  it('types.isStringWithinLength() - Returns false if string is too long', function() {
    assert.isFalse(types.isStringWithinLength("test", 1, 3))
  })
  it('types.isStringWithinLength() - Returns true if string is within length (min)', function() {
    assert.isTrue(types.isStringWithinLength("asdfg", 5, 10))
  })
  it('types.isStringWithinLength() - Returns true if string is within length (max)', function() {
    assert.isTrue(types.isStringWithinLength("asdfghjklq", 5, 10))
  })
  it('types.isStringWithinLength() - Returns true if string is within length', function() {
    assert.isTrue(types.isStringWithinLength("asdfgdd", 5, 10))
  })
})
