import { Mailgun } from 'mailgun-js';

const mailgun = require('mailgun-js');
const { mailgunConfig } = require('config');

let client: any = null;

class MailgunClient {
  public static async sendOneEmail(to: string[], subject: string, body: string) {
    const data = {
      from: `<no-reply@${mailgunConfig.domain}>`,
      to,
      subject,
      html: body,
      'o:tracking': false,
    };

    return this.getClient().messages().send(data);
  }

  private static getClient(): Mailgun {
    if (client === null) {
      client = mailgun({
        apiKey: mailgunConfig.apiKey,
        domain: mailgunConfig.domain,
      });
    }

    return client;
  }
}

export = MailgunClient;
