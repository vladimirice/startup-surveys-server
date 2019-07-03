import { IRecipient } from '../models/recipients';
import { ISurvey } from '../models/surveys';
import { IRequestWithUser } from '../../api/interfaces/request-interfaces';
import { IUser } from '../../mongo/models/users';
import { surveyEmailTemplate } from '../templates/email-template';

import MailgunClient = require('../../mailing/client/mailgun-client');

const mongoose = require('mongoose');

const SurveyModel = mongoose.model('surveys');

class SurveyCreationService {
  public static async createNewSurvey(request: IRequestWithUser): Promise<IUser> {
    const {
      title, subject, body, recipients: recipientsString,
    } = request.body;

    const { user } = request;

    const recipients: IRecipient =
      recipientsString.split(',').map((item: string) => ({ email: item.trim() }));

    const survey: ISurvey = new SurveyModel({
      title,
      subject,
      body,
      recipients,
      _user:      user.id,
      createdAt:  Date.now(),
    });

    await survey.save();

    user.credits -= 1;
    const updatedUser = await user.save();

    await this.sendEmails(survey);

    return updatedUser;
  }

  private static async sendEmails(survey: ISurvey) {
    const body: string = surveyEmailTemplate(survey);

    const to: string[] = survey.recipients.map(item => item.email);

    const response = await MailgunClient.sendOneEmail(to, survey.subject, body);

    // eslint-disable-next-line no-console
    console.dir(response);
  }
}

export = SurveyCreationService;
