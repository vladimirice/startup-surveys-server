module.exports = {
  googleOauth: {
    clientID: process.env.googleOauth_clientID,
    clientSecret: process.env.googleOauth_clientSecret,
  },
  mongo: {
    connectionString: process.env.mongo_connectionString,
  },
  sessionCookie: {
    secret: process.env.sessionCookie_secret,
  }
};
