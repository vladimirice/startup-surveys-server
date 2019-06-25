const passport        = require('passport');
const { googleOauth } = require('config');
const mongoose        = require('mongoose');

const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const UserModel = mongoose.model('users');

const googleStrategyConfig = {
  clientID:     googleOauth.clientID,
  clientSecret: googleOauth.clientSecret,
  callbackURL: '/auth/google/callback',
};

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

const googleStrategy = new GoogleStrategy(googleStrategyConfig,
  // @ts-ignore
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    const { id } = profile;
    const existing = await UserModel.findOne({ googleId: id });

    if (existing) {
      done(null, existing);
    } else {
      const model = new UserModel({ googleId: profile.id });
      await model.save();

      done(null, model);
    }
  });

passport.use(googleStrategy);

export {
  passport,
};
