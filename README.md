# act-send-mail

Apify actor to send mail.

## Input

**Example:**
```javascript
{
    // Email address of the recipient(s) (e.g. "Apify <info@apify.com>")
    // Required
    to: String,
    // Email CC same format as to
    // Required
    cc: String
    // Email BCC same format as to
    bcc: String
    // Email subject
    // Required
    subject: String,
    // Text body of Email
    // Required
    text: String,
    // Email attachments
    attachments: [Object]
}
```

**Attributes:**
- `to` - Email address of the recipient(s) (e.g. "Apify <info@apify.com>")
- `cc` - Email CC same format as to
- `bcc` - Email BCC same format as to
- `subject` - Email subject
- `text` - Text body of Email
- `html` - HTML body of Email
- `replyTo` - Email address which will be set when recipient will try to reply to mail. (Uses header `Reply-To` see [doc](https://tools.ietf.org/html/rfc5322#section-3.6.2))
- `attachments` - array of attachments in base64 string, example:
```javascript
[{
    // attachment file name
    filename: String,
    // attachment content in base64 string
    data: String
}]
```

## Usage

### From other Apify actor

```javascript
await Apify.call('apify/send-mail', {
    to: 'test@apify.com',
    subject: 'Test from actor',
    text: "Email text",
    attachments: [{
        filename: 'test.txt',
        data: 'dGVzdCBzZmFzZGFzZGFzZGFzZA'
    }]
});
```

### From Apify Crawler finish webhook

For a specific crawler set the following parameters:

#### Finish webhook URL (finishWebhookUrl)

https://api.apify.com/v2/acts/apify~send-mail/runs?token=APIFY_API_TOKEN
You can find your API token on your Apify account page.

#### Finish webhook data (finishWebhookData)

```json
{
    "to": "test@apify.com",
    "subject": "Test from crawler",
    "text": "Text",
    "html": "<p>Text</p>"
}
```
