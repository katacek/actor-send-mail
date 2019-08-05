const Apify = require('apify');
const mailgun = require('mailgun-js');
const typeCheck = require('type-check').typeCheck;
const _ = require('underscore');

// Input data attributes types
const INPUT_TYPES = `{
        to: String,
        subject: String,
        text: Maybe String,
        html: Maybe String,
        isMock: Maybe Boolean,
        cc: Maybe String,
        bcc: Maybe String,
        actId: Maybe String,
        _id: Maybe String,
        attachments: Maybe [{filename: String, data: String}],
        replyTo: Maybe String
    }`;
// Allowed mail attributes
const MAIL_ATTRIBUTES = ['to', 'subject', 'text', 'html', 'cc', 'bcc'];

Apify.main(async () => {
    // Gets input of your act
    let input = await Apify.getInput();
    if (!input) {
        throw new Error('Input is missing!');
    }
    // Data from crawler finish webhook was in input.data JSON string
    if (input.data) {
        input = Object.assign(input, JSON.parse(input.data));
        delete input.data;
    }
    // Checks input
    if (!(input.text || input.html)) throw new Error('Invalid input data, text or html missing.');
    if (!typeCheck(INPUT_TYPES, input)) {
        console.log(`Invalid input:\n${JSON.stringify(input,null,2)}\n\nData types:\n${INPUT_TYPES}\n\nAct failed!`);
        throw new Error('Invalid input data');
    }

    // Sends mail
    const mail = _.pick(input, MAIL_ATTRIBUTES);
    mail.from = 'Apify Mailer <postmaster@apify-mailer.com>';
    if (input.replyTo) mail['h:Reply-To'] = input.replyTo;
    const sender = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    // Gets all attachments
    if (input.attachments) {
        mail.attachment = [];
        for (let attachment of input.attachments) {
            const attch = new sender.Attachment({
                data: Buffer.from(attachment.data, 'base64'),
                filename: attachment.filename
            });
            mail.attachment.push(attch);
        }
    }

    console.log(mail);
    if (input.isMock) {
        console.log(`Mail:\n${JSON.stringify(mail)}`)
    } else {
        const senderBody = await sender.messages().send(mail);
        console.log(`Email with id ${senderBody.id} was sent to ${mail.to}.`);
    }
    // Sleeps act for 10s
    // NOTE: We use sleep to avoid instant usage
    await new Promise((resolve, reject) => setTimeout(resolve, 10 * 1000));
});
