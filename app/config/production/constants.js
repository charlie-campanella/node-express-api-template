/**
 * @module config/production/constants
 * @description This module exports constant variables that are used throughout the application. Development constants rely on this module
 * @returns {Object} Application configuration object
 */
const constants = {
  app_name: 'API Template',
  developer_name: 'Company, Inc.',
  server: {
    port: process.env.PORT || 3000,
    db: {
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    encryption: {
      jwtSecret: 'qmADwGHEQPwm2Xm5TBZ6ZWCB59RUa75wup3PPSuMYd7Tk87P93Hjg33L2vMJW3uT'
    },
    throttle: { //IP-Based throttling. Maximimum of <periodRequestLimit> requests in <periodMinutes>
      periodMinutes: 1,
      periodRequestLimit: 100
    }
  },
  mail: {
    provider: "MailGun",
    domain: "sandbox18dacf42200d4294bbdc5777f576855d.mailgun.org",
    private_key: process.env.MAILGUN_PRIVATE_KEY,
    public_key: process.env.MAILGUN_PUBLIC_KEY
  },
  users: {
    types: ['admin', 'business'],
    sessionLength: 86400, //Seconds
    authThrottleSeconds: 15 //Number of seconds one must wait between invalid auth requests
  }
}
module.exports = constants
