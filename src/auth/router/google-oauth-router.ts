import { passport } from '../service/passport-service';

const express = require('express');

const router = express.Router();

router.get('/', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

// @ts-ignore ''
router.get('/callback', passport.authenticate('google'), (req: any, res: any) => {
  res.send({
    success: true,
  });
});

export = router;
