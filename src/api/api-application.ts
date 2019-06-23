const express = require('express');

const app = express();

const googleOauthRouter = require('../auth/router/google-oauth-router');

app.use('/auth/google', googleOauthRouter);

app.listen(process.env.PORT);

export {};
