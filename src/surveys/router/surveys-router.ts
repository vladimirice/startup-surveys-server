import { Response } from 'express';
import { loginIsRequired } from '../../auth/middleware/login-is-required';
import { creditsAreRequired } from '../middleware/credits-are-required';
import { IRequestWithUser } from '../../api/interfaces/request-interfaces';
import { ISurvey } from '../models/surveys';
import { IRecipient } from '../models/recipients';

const mongoose = require('mongoose');

const express = require('express');

const SurveyModel = mongoose.model('surveys');

const router = express.Router();
const statuses = require('statuses');

router.post('/', loginIsRequired, creditsAreRequired, async (req: IRequestWithUser, res: Response) => {
  // #task - joi fields validation
  const { title, subject, body } = req.body;

  const recipients: IRecipient =
    req.body.recipients.split(',').map((item: string) => ({ email: item.trim() }));

  const survey: ISurvey = new SurveyModel({
    title,
    subject,
    body,
    recipients,
    _user:      req.user.id,
    createdAt:  Date.now(),
  });

  let updatedUser;
  try {
    await survey.save();
    req.user.credits -= 1;
    updatedUser = await req.user.save();
  } catch (error) {
    return res.status(statuses('Unprocessable Entity')).send(error);
  }

  return res.status(statuses('Created')).send(updatedUser);
});

export = router;
