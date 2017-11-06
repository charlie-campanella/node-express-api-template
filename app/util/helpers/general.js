/**
 * @module util/helpers/general
 * @requires config
 * @requires util/errors
 * @description This module provides general helper functions that (subjectively) do not have another place to go
 * @returns {Object}
 */
/* Third Party Dependencies */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

/* Custom Dependencies */
const config = require('../../config')

/**
 * @function
 * @description Returns a 10-character unix timestamp string
 * @returns {String}
 */
const currentUnixTime = function() {
  return Math.floor(+new Date()/1000).toString()
}

/**
 * @function
 * @description Hashes a string and returns the hash and salt
 * @returns {Promise} resolve({hash, salt}) or reject(err)
 */
const hash = function(string) {
  return new Promise(function(resolve, reject) {
    if (!string || typeof string !== 'string') {
      reject("Invalid string")
    }
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(string, salt)
    resolve(hash)
  })
}

/**
 * @function
 * @description Compares a string/salt hash to another provided hash
 * @returns {Promise} resolve() or reject(err)
 */
const hashCompare = function(password, hash) {
  return new Promise(function(resolve, reject) {
    let result = bcrypt.compareSync(password, hash)
    resolve(result)
  })
}

/**
 * @function
 * @description Generates a JWT
 * @param {Number}
 * @returns {Number}
 */
const generateJsonWebToken = function(payload, callback) {
  if (!payload || typeof payload !== 'object') {
    throw new Error("payload must be an object")
  } else if (!callback || typeof callback !== 'function') {
    throw new Error("callback must be a function")
  }
  jwt.sign(payload, config.constants.server.encryption.jwtSecret, function(err, token) {
    if (err) {
      throw new Error(err)
    }
    return callback(token)
  })
}

/**
 * @function
 * @description Returns a random number
 * @param {Number} [length=1] Number of digits in the generated number
 * @returns {Number}
 */
const generateRandomNumber = function(length) {
  if (!length || !typeof length === 'number') {
    length = 1
  }
  var number = ""
	var possible = "123456789"
	for (var i = 0; i < length; i++) {
		number += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return parseInt(number)
}

module.exports = {
  currentUnixTime,
  hash: hash,
  hashCompare: hashCompare,
  generateJsonWebToken,
  generateRandomNumber
}
