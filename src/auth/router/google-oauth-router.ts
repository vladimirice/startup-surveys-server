import { Request, Response } from 'express';

import { passport } from '../service/passport-service';

const express = require('express');

const router = express.Router();
const { servers } = require('config');

router.get('/', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

// @ts-ignore
router.get('/callback', passport.authenticate('google'), (req: Request, res: Response) => {
  res.redirect(`${servers.client}/surveys`);
});

export = router;
