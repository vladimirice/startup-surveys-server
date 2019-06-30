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
  },
  stripeConfig: {
    publishableKey: process.env.stripe_publishableKey,
    secretKey: process.env.stripe_secretKey,
  },
  sendGridConfig: {
    secretKey: process.env.sendGrid_secretKey,
  },
  servers: {
    client: 'http://startup-surveys.sunarmy.pro',
  },
};
