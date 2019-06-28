import { Response } from 'express';
import { IRequestWithUser } from '../../api/interfaces/request-interfaces';
import { loginIsRequired } from '../../auth/middleware/login-is-required';

const { stripeConfig } = require('config');

const stripe = require('stripe')(stripeConfig.secretKey);
const express = require('express');

const router = express.Router();

router.post('/callback', loginIsRequired, async (req: IRequestWithUser, res: Response) => {
  const amountInMajor: number = 5;
  // #task - fetch this data from the database
  await stripe.charges.create({
    amount: amountInMajor * 100,
    currency: 'usd',
    description: `${amountInMajor} for the ${amountInMajor} credits`,
    source: req.body.token.id,
  });

  const { user } = req;
  user.credits += amountInMajor;

  const updatedUser = await user.save();

  res.send(updatedUser);
});

export = router;
