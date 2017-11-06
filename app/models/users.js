/**
 * @module models/users
 * @description Contains the Mongoose model that defines user accounts. Note that input validation is handled within the model.
 * @requires config
 * @requires util
 * @returns {Function} Mongoose Model
 */
 /* Third Party Dependencies */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
/* Custom Dependencies */
const config = require('../config')
const util = require('../util')
const userSchema = new Schema({
  created: {
    type: String,
    required: [true, "Something went wrong on our end"],
    validate: [util.validation.dateTime.isTimeStamp, 'Invalid timestamp format'],
    default: util.helpers.general.currentUnixTime()
  },
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    minlength: [1, 'Full Name must be between 1 and 50 characters in length'],
    maxlength: [50, 'Full Name must be between 1 and 50 characters in length']
  },
  permissions: {
    type: {
      type: String,
      required: [true, "Account Type is required"],
      enum: {
        values: config.constants.users.types,
        message: "Invalid Account Type specified"
      }
    },
    type_link: {
      type: String,
      required: false,
      minlength: [0, "Link to business/api profile must be at least 0 characters in length"],
      maxlength: 256
    }
  },
  auth: {
    emailAddress: {
      type: String,
      required: [true, "Email Address is required"],
      index: true,
      unique: "Email Address is already in use",
      uniqueCaseInsensitive: true,
      validate: [util.validation.specialStrings.isEmailString, 'Invalid Email Address format']
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [32, "Something went wrong with password validation 1"],
      maxlength: [128, "Something went wrong with password validation 2"]
    },
    lastAuthAttempt: {
      type: String,
      required: [true, "Something went wrong"],
      validate: [util.validation.dateTime.isTimeStamp, 'Invalid timestamp format'],
      default: util.helpers.general.currentUnixTime()
    },
    confirmation: {
      confirmed: {
        type: Boolean,
        required: [true, "Something went wrong"],
        default: false
      },
      code: {
        type: Number,
        required: [true, "Something went wrong"],
        min: [1000, "Something went wrong"],
        max: [9999, "Something went wrong"],
        default: util.helpers.general.generateRandomNumber(4)
      },
      failures: {
        type: Number,
        required: true,
        min: 0,
        default: 0
      }
    }
  }
})
/* Executed before validation occurs */
userSchema.pre('validate', function(next) {
  var user = this
  if (user.isModified('auth.password')) { //If a change in password is detected...
    //Reject save if password has invalid length
    if (!util.validation.types.isString(user.auth.password) || user.auth.password < 1) {
      user.invalidate('auth.password', "Password is required")
      next()
    } else if (!util.validation.types.isStringWithinLength(user.auth.password, 10, 25)) {
      user.invalidate('auth.password', "Password must be between 10 and 25 characters in length")
      next()
    } else { //Encrypt password and set password/salt fields if valid
      util.helpers.general.hash(user.auth.password).then(function(result) {
        user.auth.password = result
        next()
      }).catch(function() {
        user.invalidate('auth.password', "Something went wrong")
        next()
      })
    }
  } else {
    next()
  }
})
userSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true
  next()
})
userSchema.plugin(uniqueValidator)
userSchema.index({'auth.emailAddress':1},{unique: true})
userSchema.index({'auth.emailAddress':1, 'auth.confirmationCode': 1, 'auth.confirmed': 1},{unique: true})
const User =  mongoose.model('User', userSchema)
User.on('index', function(error) {
  if (error) {
    console.log(error.message)
  }
})
module.exports = User
