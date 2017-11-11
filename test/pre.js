require('dotenv').config()
if (process.env.NODE_ENV !== "development") {
  throw new Error("Environment must be in development.")
} else if (process.env.DB_NAME === "production-db") {
  throw new Error("DO NOT RUN TESTS ON PRODUCTION DATABASE!!!!!!!")
}
const environment = require('../app/environment.js')
environment.init()
