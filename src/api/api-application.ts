import CorsHelper = require('./helpers/cors-helper');

const express       = require('express');
const passport      = require('passport');
const cookieSession = require('cookie-session');
const bodyParser    = require('body-parser');

const { sessionCookieConfig } = require('config');

const app = express();
// eslint-disable-next-line node/no-missing-require
require('../mongo/client/mongo-client');
// eslint-disable-next-line node/no-missing-require
require('../mongo/models/users');

CorsHelper.addRegularCors(app);

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [sessionCookieConfig.secret],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

import googleOauthRouter  = require('../auth/router/google-oauth-router');
import usersRouter        = require('../users/router/users-router');
import authRouter         = require('../auth/router/auth-router');
import stripeRouter       = require('../stripe/router/stripe-router');

app.use('/auth/google', googleOauthRouter);
app.use('/users',       usersRouter);
app.use('/auth',        authRouter);
app.use('/stripe',      stripeRouter);

export {
  app,
};
