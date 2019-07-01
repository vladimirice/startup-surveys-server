module.exports = {
  googleOauth: {
    clientID: '12345',
    clientSecret: '12345',
  },
  mongo: {
    connectionString: 'mongodb://173.18.215.20:27017/startup-surveys',
  },
  sessionCookieConfig: {
    secret: 'hJxG0lwC9L0Q',
  },
  servers: {
    client: 'http://localhost:3000',
  },
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'http://startup-surveys.sunarmy.pro',
    ],
  },
  stripeConfig: {
    publishableKey: '12345',
    secretKey: '12345',
  },
  mailgunConfig: {
    domain: 'mg-startup-surveys.sunarmy.pro',
    apiKey: '12345',
  },
};
