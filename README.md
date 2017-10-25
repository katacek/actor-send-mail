# act-send-mail

Apify act to send mail.

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

### From other Apify act

```javascript
Apify.call('apify/send-mail', {
    to: 'test@apify.com',
    subject: 'Test from act',
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

https://api.apify.com/v2/acts/apify~send-mail/runs?token=APIFIER_API_TOKEN
You can find your API token on your Apifier account page.

#### Finish webhook data (finishWebhookData)

```json
{
    "to": "test@apify.com",
    "subject": "Test from crawler",
    "text": "Text"
}
```
