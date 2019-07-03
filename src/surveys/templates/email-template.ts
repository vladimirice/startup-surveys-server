/* eslint-disable no-underscore-dangle */
import { ISurvey } from '../models/surveys';

const { servers } = require('config');

export const surveyEmailTemplate = (survey: ISurvey) => {
  const prefix = `${servers.server}/surveys/${survey._id}`;

  return `
    <html lang="en">
      <body>
        <div style="text-align: center;">
          <img src="https://avatars1.githubusercontent.com/u/49952640?s=200&v=4" alt="logo">
          <h3>I'd like your input</h3>
          <p>Please answer the following question:</p>
          <p>${survey.body}</p>
          <div>
            <a href="${prefix}/yes">Yes</a>
          </div>
          <div>
            <a href="${prefix}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
