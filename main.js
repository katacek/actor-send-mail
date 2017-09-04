const Apify = require('apify');
const mailgun = require('mailgun-js');
const request = require('request-promise');
const typeCheck = require('type-check').typeCheck;
const sleep = require('sleep');
const _ = require('underscore');

// Input data attributes types
const DATA_TYPES = `{
        to: String,
        subject: String,
        text: String,
        isMock: Maybe Boolean,
        cc: Maybe String,
        bcc: Maybe String,
    }`;
// Allowed mail attributes
const MAIL_ATTRIBUTES = ['to', 'subject', 'text', 'cc', 'bcc'];

Apify.main(async () => {
    // Gets input of your act
    const input = await Apify.getValue('INPUT');
    if (!input.data) {
        throw new Error('Input data is missing!');
    }
    // NOTE: Data from crawler finish webhook was JSON string
    const data = (typeof input.data === 'string') ? JSON.parse(input.data) : input.data;
    // Checks input
    if (!typeCheck(DATA_TYPES, data)) {
        console.log(`Invalid input data:\n${JSON.stringify(data)}\nData types:\n${DATA_TYPES}\nAct failed!`);
        throw new Error('Invalid input data');
    }

    // Sends mail
    const mail = _.pick(data, MAIL_ATTRIBUTES);
    mail.from = 'Apifier Mailer <postmaster@apify-mailer.com>';

    if (data.isMock) {
        console.log(`Mail:\n${JSON.stringify(mail)}`)
    } else {
        const sender = mailgun({
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        });
        const senderBody = await sender.messages().send(mail);
        console.log(`Email with id ${senderBody.id} was send to ${mail.to}.`);
    }

    // Sleeps act for 10s
    // NOTE: We use sleep to avoid instant usage
    sleep.sleep(10);
});