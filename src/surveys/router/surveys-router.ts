import { Response } from 'express';
import { loginIsRequired } from '../../auth/middleware/login-is-required';
import { creditsAreRequired } from '../middleware/credits-are-required';
import { IRequestWithUser } from '../../api/interfaces/request-interfaces';
import { ISurvey } from '../models/surveys';
import { IRecipient } from '../models/recipients';
import { surveyEmailTemplate } from '../templates/email-template';

import MailgunClient = require('../../mailing/client/mailgun-client');

const mongoose = require('mongoose');

const express = require('express');

const SurveyModel = mongoose.model('surveys');

const router = express.Router();
const statuses = require('statuses');

router.get('/', async (req: any, res: any) => {
  const surveys: ISurvey =
    await SurveyModel.find({ _user: req.user.id })
      .select({ recipients: false });

  res.send(surveys);
});


// @ts-ignore
router.get('/send-sample', async (req: any, res: any) => {
  const body: string = surveyEmailTemplate('What do you think?');

  // TODO - attach this to the survey creation message

  const to = [
    'mr.vladimir.ice@gmail.com',
    'mr.sapozhnikov.v.s@gmail.com',
  ];

  // Anonymus batch sending
  const response = await MailgunClient.sendOneEmail(to, 'Hello there', body);

  // eslint-disable-next-line no-console
  console.dir(response);

  res.send({
    success: true,
  });
});

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

    // TODO send a email

    req.user.credits -= 1;
    updatedUser = await req.user.save();
  } catch (error) {
    return res.status(statuses('Unprocessable Entity')).send(error);
  }

  return res.status(statuses('Created')).send(updatedUser);
});

export = router;
