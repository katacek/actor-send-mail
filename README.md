# Apify Send Mail

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
- `to` - Email address of the recipient(s), you can comma-separate multiple addresses (e.g. "Apify <info@apify.com>" or "info@apify.com, hello@apify.com")
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
    subject: 'Test from act',
    text: "Email text",
    attachments: [{
        filename: 'test.txt',
        data: 'dGVzdCBzZmFzZGFzZGFzZGFzZA'
    }]
});
```

### From Apify actor/task webhook

Calling this actor via a [webhook](https://docs.apify.com/webhooks) is very handy because you can ensure it is sent only after specific event happens. Here is an example setup to send email after failed run.

1. Open **Webhooks** tab of the actor/task that you want to monitor.
2. Set **Event types** to `Run failed` and `Run timed out`.
3. **URL** is the RUN API endpoint of this actor, just fill your API token - https://api.apify.com/v2/acts/apify~send-mail/runs?token=APIFY_API_TOKEN
4. **Payload template** represents the body that is sent to this actor. An example below:

```
{
    "to": "test@apify.com",
    "subject": "Task Scrape-website run failed",
    "text": "Run link - https://my.apify.com/tasks/{{eventData.actorTaskId}}#/runs/{{eventData.actorRunId}}"
}
```

This example expects that the webhook is sent from a task run. If you want to send it from an actor run, just update the "text" to
```"text": "Run link - https://my.apify.com/actors/{{eventData.actorId}}#/runs/{{eventData.actorRunId}}"```
