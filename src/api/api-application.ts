import { Request, Response } from 'express';

import CorsHelper = require('./helpers/cors-helper');

const express       = require('express');
const passport      = require('passport');
const cookieSession = require('cookie-session');
const bodyParser    = require('body-parser');

const { sessionCookieConfig } = require('config');

const { servers } = require('config');

const app = express();
require('../mongo/client/mongo-client');
require('../mongo/models/users');
require('../surveys/models/surveys');

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
import surveysRouter      = require('../surveys/router/surveys-router');

app.get('/', (
  // @ts-ignore
  req: Request,
  res: Response,
) => {
  const html = `
  <html lang="en">
    <body>
      <h4>This is a startup-surveys-server API. Follow the link below to access the main project</h4>
      <a href="${servers.client}">${servers.client}</a>
    </body>
  </html>
  `;

  res.send(html);
});

app.use('/auth/google', googleOauthRouter);
app.use('/users',       usersRouter);
app.use('/auth',        authRouter);
app.use('/stripe',      stripeRouter);
app.use('/surveys',     surveysRouter);

export {
  app,
};
