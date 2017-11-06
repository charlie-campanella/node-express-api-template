const chai = require('chai')
const assert = chai.assert

const validation = require('../../../../app/util/validation')
const specialStrings = validation.specialStrings

describe('util/validation/specialStrings.js', function() {
  /* specialStrings.isBusinessNameString() Tests */
  it('specialStrings.isBusinessNameString() - Returns false if nothing is passed', function() {
    assert.isFalse(specialStrings.isBusinessNameString())
  })
  it('specialStrings.isBusinessNameString() - Returns false if non-string (number) is passed', function() {
    assert.isFalse(specialStrings.isBusinessNameString(1))
  })
  it('specialStrings.isBusinessNameString() - Returns false if non-string (object) is passed', function() {
    assert.isFalse(specialStrings.isBusinessNameString({}))
  })
  it('specialStrings.isBusinessNameString() - Returns false if string begins with space', function() {
    assert.isFalse(specialStrings.isBusinessNameString(" bad"))
  })
  it('specialStrings.isBusinessNameString() - Returns false if string ends with space', function() {
    assert.isFalse(specialStrings.isBusinessNameString("bad "))
  })
  it('specialStrings.isBusinessNameString() - Returns true if string has spaces and apostrophes', function() {
    assert.isTrue(specialStrings.isBusinessNameString("This string's pretty cool"))
  })
  it('specialStrings.isBusinessNameString() - Returns true if string has ?, !', function() {
    assert.isTrue(specialStrings.isBusinessNameString("j?!"))
  })
  it('specialStrings.isBusinessNameString() - Returns false if string ONLY has ?, !', function() {
    assert.isFalse(specialStrings.isBusinessNameString("?!"))
  })
  /* End specialStrings.isBusinessNameString() Tests */
  /* specialStrings.isEmailString() Tests */
  it('specialStrings.isEmailString() - Returns false if nothing is passed', function() {
    assert.isFalse(specialStrings.isEmailString())
  })
  it('specialStrings.isEmailString() - Returns false if non-string (number) is passed', function() {
    assert.isFalse(specialStrings.isEmailString(1))
  })
  it('specialStrings.isEmailString() - Returns false if non-string (object) is passed', function() {
    assert.isFalse(specialStrings.isEmailString({test: "test"}))
  })
  it('specialStrings.isEmailString() - Returns false if non-string (function) is passed', function() {
    assert.isFalse(specialStrings.isEmailString(function() {
      console.log("bad if this returns true")
    }))
  })
  it('specialStrings.isEmailString() - Returns false if non-email string is passed', function() {
    assert.isFalse(specialStrings.isEmailString("asdfghjkl"))
  })
  it("specialStrings.isEmailString() - Returns false if string in '<string>@<string>' format is passed", function() {
    assert.isFalse(specialStrings.isEmailString("asd@asd"))
  })
  it("specialStrings.isEmailString() - Returns false if string in '@<string>' format is passed", function() {
    assert.isFalse(specialStrings.isEmailString("@asd"))
  })
  it("specialStrings.isEmailString() - Returns false if string in '<string>@<string>.' format is passed", function() {
    assert.isFalse(specialStrings.isEmailString("asd@asd."))
  })
  it("specialStrings.isEmailString() - Returns true if string in '<string>@<string>.<string>' format is passed", function() {
    assert.isTrue(specialStrings.isEmailString("asd@asd.xyz"))
  })
  it("specialStrings.isEmailString() - Returns false if email is more than 64 characters", function() {
    assert.isFalse(specialStrings.isEmailString("qwertyuiopasddsfhkdsagfhjsadgfksdafgsdajkhfgsdakjhfgsakdjhfgksjadfghjklzxcvbnm@qwertyuiopasdfghjklzxcvbnm.qwe"))
  })
  /* End specialStrings.isEmailString() Tests */
  /* specialStrings.isObjectIdString() Tests */
  it('specialStrings.isObjectIdString() - Returns false if nothing is passed', function() {
    assert.isFalse(specialStrings.isObjectIdString())
  })
  it('specialStrings.isObjectIdString() - Returns false if boolean is passed', function() {
    assert.isFalse(specialStrings.isObjectIdString(true))
  })
  it('specialStrings.isObjectIdString() - Returns false if object is passed', function() {
    assert.isFalse(specialStrings.isObjectIdString({}))
  })
  it('specialStrings.isObjectIdString() - Returns false if regular string is passed', function() {
    assert.isFalse(specialStrings.isObjectIdString("stringy"))
  })
  it('specialStrings.isObjectIdString() - Returns true if valid object id string is passed', function() {
    assert.isTrue(specialStrings.isObjectIdString("53cb6b9b4f4ddef1ad47f943"))
  })
  /* End specialStrings.isObjectIdString() Tests */
})
