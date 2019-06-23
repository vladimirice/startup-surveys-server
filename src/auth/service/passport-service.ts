const passport        = require('passport');
const { googleOauth } = require('config');

const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const googleStrategyConfig = {
  clientID:     googleOauth.clientID,
  clientSecret: googleOauth.clientSecret,
  callbackURL: '/auth/google/callback',
};

const googleStrategy = new GoogleStrategy(googleStrategyConfig,
  (accessToken: string, refreshToken: string, profile: string) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
  });

passport.use(googleStrategy);

export {
  passport,
};
