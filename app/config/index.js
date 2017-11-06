/**
 * @module config
 * @description Determines which configuration and credential modules to return based on the NODE_ENV
 * @returns {Object} {constants}
 */
/* Third Party Dependencies */
require('dotenv').config()

const env = process.env.NODE_ENV
if (env !== 'development' && env !== 'production') {
  throw new Error("Invalid NODE_ENV specified")
}

const constantsFile = require('./' + env + '/constants')

constantsFile.env = env

module.exports = {
  constants: constantsFile
}
