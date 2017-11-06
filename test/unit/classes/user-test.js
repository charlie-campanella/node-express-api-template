const chai = require('chai')
const assert = chai.assert

const config = require('../../../app/config')
const User = require('../../../app/classes/user')
const util = require('../../../app/util')

let generateMock = function() {
  return {
    fullName: "Test User",
    accountType: "business",
    emailAddress: "test" + util.helpers.general.generateRandomNumber(10) + "@test.com",
    password: "password123"
  }
}

let validRegisterData = generateMock() //Data used across tests. Register first. Then use newly created user for further tests.

describe('classes/user.js', function() {
  it('Should return an function (class)', function() {
    assert.isFunction(User)
  })

  /* User Constructor Tests */
  it('User Class - Constructor function throws error if options is not passed in User class constructor', function() {
    assert.throws(function() {
      let TestUser = new User()
    }, Error, "options must be defined")
  })
  it('User Class - Constructor function throws error if options._id and options.emailAddress are not defined', function() {
    assert.throws(function() {
      let options = {

      }
      let TestUser = new User(options)
    }, Error, "options._id or options.emailAddress must be defined")
  })
  it('User Class - Constructor function throws error if both options._id and options.emailAddress are defined', function() {
    assert.throws(function() {
      let options = {
        _id: "123456789",
        emailAddress: "test@test.com"
      }
      let TestUser = new User(options)
    }, Error, "options._id and options.emailAddress cannot be defined at the same time")
  })
  it('User Class - Constructor function throws error if options._id is not an object id string', function() {
    assert.throws(function() {
      let options = {
        _id: true
      }
      let TestUser = new User(options)
    }, Error, "options._id must be a valid object id string")
  })
  it('User Class - Constructor function throws error if options.emailAddress is not a valid email address', function() {
    assert.throws(function() {
      let options = {
        emailAddress: "badFormat"
      }
      let TestUser = new User(options)
    }, Error, "options.emailAddress must be a valid email address")
  })
  /* End User Constructor Tests */

  /* User.register() tests */
  it('User.register() - Promise rejects with no data passed', function() {
    return User.register().then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid user data format", errors))
    })
  })
  it('User.register() - Promise rejects with no fullName', function() {
    let mock = generateMock()
    mock["fullName"] = ""
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Full Name is required", errors))
    })
  })
  it('User.register() - Promise rejects with long fullName', function() {
    let mock = generateMock()
    mock["fullName"] = "sdjhfldskhflasdkjfhlsadkjfhsdklfhsaldkjfhlasdkfhasdkjfhas fhjadsfklsadfsd fjsdhfdkls jajdfkfdsfdsf"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Full Name must be between 1 and 50 characters in length", errors))
    })
  })
  it('User.register() - Promise rejects no account type', function() {
    let mock = generateMock()
    mock["accountType"] = ""
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Account Type is required", errors))
    })
  })
  it('User.register() - Promise rejects with invalid account type', function() {
    let mock = generateMock()
    mock["accountType"] = "invalid account type"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid Account Type specified", errors))
    })
  })
  it('User.register() - Promise rejects with admin account type', function() {
    let mock = generateMock()
    mock["accountType"] = "admin"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid Account Type specified", errors))
    })
  })
  it('User.register() - Promise rejects when no email address is specified', function() {
    let mock = generateMock()
    mock["emailAddress"] = ""
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Email Address is required", errors))
    })
  })
  it('User.register() - Promise rejects invalid email address format (format)', function() {
    let mock = generateMock()
    mock["emailAddress"] = "invalidformat"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid Email Address format", errors))
    })
  })
  it('User.register() - Promise rejects invalid email address format (long)', function() {
    let mock = generateMock()
    mock["emailAddress"] = "goodformatbutwaytoolong@thisisaveryverylongdomainthatshouldnotexist.com"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid Email Address format", errors))
    })
  })
  it('User.register() - Promise rejects when no password is specified', function() {
    let mock = generateMock()
    mock["password"] = ""
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Password is required", errors))
    })
  })
  it('User.register() - Promise rejects when short password is specified', function() {
    let mock = generateMock()
    mock["password"] = "a"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Password must be between 10 and 25 characters in length", errors))
    })
  })
  it('User.register() - Promise rejects when long password is specified', function() {
    let mock = generateMock()
    mock["password"] = "sdhlaskjdhfdalskjhflsdkjfhlaskdjfhads flhasdf lkajsdfhasdj fkjfjdhjs fdkslja dsjfaskdfh"
    return User.register(mock).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Password must be between 10 and 25 characters in length", errors))
    })
  })
  it('User.register() - Promise resolves with valid user data', function() {
    return User.register(validRegisterData).then(function(createdUser) {
      assert.isObject(createdUser)
      assert.equal(validRegisterData.emailAddress, createdUser.auth.emailAddress)
    }).catch(function(err) {
      throw new Error("Should not reject")
    })
  })
  it('User.register() - Promise rejects when email address is already in use', function() {
    return User.register(validRegisterData).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Email Address is already in use", errors))
    })
  })
  /* End User.register() Tests */

  /* User.confirm() Tests */
  it('User.confirm() - Promise rejects with no data passed', function() {
    return User.confirm().then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid confirmation data format", errors))
    })
  })
  it('User.confirm() - Promise rejects with invalid emailAddress format', function() {
    return User.confirm({
      emailAddress: "bad"
    }).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid emailAddress format", errors))
    })
  })
  it('User.confirm() - Promise rejects with invalid confirmationCode format', function() {
    return User.confirm({
      emailAddress: "test@test.com",
      confirmationCode: false
    }).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid confirmationCode format", errors))
    })
  })
  it('User.confirm() - Promise rejects with invalid data in proper format', function() {
    return User.confirm({
      emailAddress: "test@test.com",
      confirmationCode: 1234
    }).then(function() {
      throw new Error("Should not resolve")
    }).catch(function(err) {
      let errors = util.errors.parse(err)
      assert.isTrue(util.validation.types.isInArray("Invalid email address or confirmation code", errors))
    })
  })
  it('User.confirm() - Promise resolves with valid data in proper format', function() {
    let ConfirmUser = new User({emailAddress: validRegisterData.emailAddress})
    return ConfirmUser.fetch().then(function(userData) {
      var code = userData.auth.confirmation.code
      return User.confirm({
        emailAddress: validRegisterData.emailAddress,
        confirmationCode: code
      }).then(function(message) {
        assert.equal(message, "Account confirmed!")
      }).catch(function(err) {
        throw new Error("Should not reject")
      })
    })
  })

  it('User.confirm() - User is now marked as confirmed in the DB', function() {
    let ConfirmUser = new User({emailAddress: validRegisterData.emailAddress})
    return ConfirmUser.fetch().then(function(userData) {
      let confirmed = userData.auth.confirmation.confirmed
      assert.isTrue(confirmed)
    })
  })
  /* End User.confirm() Tests */

  /* User.fetch() Tests */
    it('User.fetch() - Fetching with invalid _id will yield no results (caught)', function() {
      let options = {
        _id: "53cb6b9b4f4ddef1ad47f943"
      }
      let TestUser = new User(options)
      return TestUser.fetch().then(function() {
        return util.errors.fatal("This should not resolve")
      }).catch(function(message) {
        assert.equal("Could not fetch user", message)
      })
    })

    it('User.fetch() - Fetching with invalid emailAddress will yield no results (caught)', function() {
      let options = {
        emailAddress: "test" + validRegisterData.emailAddress
      }
      let TestUser = new User(options)
      return TestUser.fetch().then(function(result) {
        return util.errors.fatal("This should not resolve")
      }).catch(function(message) {
        assert.equal("Could not fetch user", message)
      })
    })

    it('User.fetch() - Fetching with valid emailAddress will yield results (resolved)', function() {
      let options = {
        emailAddress: validRegisterData.emailAddress
      }
      let TestUser = new User(options)
      return TestUser.fetch().then(function(result) {
        assert.equal(result.auth.emailAddress, validRegisterData.emailAddress)
      }).catch(function(status) {
        return util.errors.fatal("This should not reject")
      })
    })
  /* End User.fetch() Tests */

  /* User.update() Tests */
  it('User.update() - Will throw error if newData object is not passed', function() {
    let options = {
      _id: "53cb6b9b4f4ddef1ad47f943"
    }
    let TestUser = new User(options)
    assert.throws(function() {
      TestUser.update()
    }, Error, "newData must be an object")
  })

  it('User.update() - Updating with invalid _id will lead to promise rejection', function() {
    let options = {
      _id: "53cb6b9b4f4ddef1ad47f943"
    }
    let newData = {}
    let TestUser = new User(options)
    return TestUser.update(newData).then(function() {
      return util.errors.fatal("This should not resolve")
    }).catch(function(message) {
      assert.equal("Could not update user", message)
    })
  })

  it('User.update() - Updating with valid emailAddress will lead to promise resolving', function() {
    let options = {
      emailAddress: validRegisterData.emailAddress
    }
    let newData = {
      fullName: "New Full Name"
    }
    let TestUser = new User(options)
    return TestUser.update(newData).then(function(updatedUser) {
      assert.isObject(updatedUser)
    }).catch(function(status) {
      return util.errors.fatal("This should not reject")
    })
  })

  it('User.update() - User data is updated in DB', function() {
    let UpdatedUser = new User({emailAddress: validRegisterData.emailAddress})
    return UpdatedUser.fetch().then(function(userData) {
      let fullName = userData.fullName
      assert.equal(fullName, "New Full Name")
    })
  })
  /* End User.update() Tests */

  /* User.login() Tests */
  it('User.login() - Will reject promise if User is not invoked with emailAddress', function() {
    let options = {
      _id: "53cb6b9b4f4ddef1ad47f943"
    }
    let LoginUser = new User(options)
    return LoginUser.login().then(function() {
      return util.errors.fatal("This should not resolve")
    }).catch(function(message) {
      assert.equal(message, "Email Address is required")
    })
  })
  it('User.login() - Will reject promise if password string is not passed as argument', function() {
    let options = {
      emailAddress: validRegisterData.emailAddress
    }
    let LoginUser = new User(options)
    return LoginUser.login().then(function() {
      return util.errors.fatal("This should not resolve")
    }).catch(function(message) {
      assert.equal(message, "Password is required")
    })
  })
  it('User.login() - Will reject promise if emailAddress is invalid', function() {
    let options = {
      emailAddress: "fake@test.com"
    }
    let LoginUser = new User(options)
    return LoginUser.login("password").then(function() {
      return util.errors.fatal("This should not resolve")
    }).catch(function(message) {
      assert.equal(message, "Could not fetch user")
    })
  })
  it('User.login() - Will reject promise if password is invalid', function() {
    let options = {
      emailAddress: validRegisterData.emailAddress
    }
    let LoginUser = new User(options)
    return LoginUser.login("password").then(function() {
      return util.errors.fatal("This should not resolve")
    }).catch(function(message) {
      assert.equal(message, "Invalid email address or password")
    })
  })
  it('User.login() - Will resolve with valid credentials', function() {
    let options = {
      emailAddress: validRegisterData.emailAddress
    }
    let LoginUser = new User(options)
    return LoginUser.login(validRegisterData.password).then(function(token) {
      assert.isString(token)
    }).catch(function(message) {
      return util.errors.fatal("This should not reject")
    })
  })
  /* End User.login() Tests */
})
