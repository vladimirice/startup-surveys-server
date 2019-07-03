import { Response } from 'express';
import { loginIsRequired } from '../../auth/middleware/login-is-required';
import { creditsAreRequired } from '../middleware/credits-are-required';
import { IRequestWithUser } from '../../api/interfaces/request-interfaces';
import { ISurvey } from '../models/surveys';

import SurveyCreationService = require('../service/survey-creation-service');

const mongoose = require('mongoose');

const express = require('express');

const SurveyModel = mongoose.model('surveys');

const router = express.Router();
const statuses = require('statuses');

const { servers } = require('config');

router.get('/:surveyId/:answer', async (req: any, res: Response) => {
  const { surveyId, answer } = req.params;

  await SurveyModel.updateOne({
    _id: surveyId,
  }, {
    $inc: { [answer]: 1 },
  });

  res.redirect(`${servers.client}/thanks`);
});

router.get('/', loginIsRequired, async (req: IRequestWithUser, res: Response) => {
  const surveys: ISurvey =
    await SurveyModel.find({ _user: req.user.id })
      .select({ recipients: false });

  res.send(surveys);
});

router.post('/', loginIsRequired, creditsAreRequired, async (req: IRequestWithUser, res: Response) => {
  try {
    const updatedUser = await SurveyCreationService.createNewSurvey(req);

    return res.status(statuses('Created')).send(updatedUser);
  } catch (error) {
    return res.status(statuses('Unprocessable Entity')).send(error);
  }
});

export = router;
