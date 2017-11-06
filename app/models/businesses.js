/**
 * @module models/businesses
 * @description Contains the Mongoose model that defines businesses. Note that input validation is handled within the model.
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

const businessSchema = new Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
    index: true,
    unique: "Account is already attached to a business",
    validate: [util.validation.specialStrings.isObjectIdString, 'Invalid userId format']
  },
  name: {
    type: String,
    required: [true, "Business Name is required"],
    index: true,
    unique: "Business Name is already in use",
    uniqueCaseInsensitive: true,
    minlength: [1, "Business Name must be between 1 and 30 characters in length"],
    maxlength: [30, "Business Name must be between 1 and 30 characters in length"],
    validate: [util.validation.specialStrings.isBusinessNameString, 'Invalid Business Name format']
  }
})

businessSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true
  next()
})

businessSchema.plugin(uniqueValidator)
businessSchema.index({'userId':1},{unique: true})
businessSchema.index({'name':1},{unique: true})
const Business =  mongoose.model('Business', businessSchema)
Business.on('index', function(error) {
  if (error) {
    console.log(error.message)
  }
})
module.exports = Business
