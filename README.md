# AWS Event Mocks
A small library that includes details mocks of AWS Lambda event sources. Useful for use when unit testing your Lambda functions. Supported Event Sources are: SNS, API Gateway, S3, & Scheduled.

## Usage

### SNS

```js
const createSnsEvent = require('aws-event-mocks').createSnsEvent;
const event = createSnsEvent({
  Records: [{
    Sns: {
      Message: 'trigger-email'
    }
  }]
});

```

### API Gateway

```js
const createApigEvent = require('aws-event-mocks').createApigEvent;
const event = createApigEvent({
  body: {
    first_name: 'Sam',
    last_name: 'Smith'
  }
});
```

### S3

```js
const createS3Event = require('aws-event-mocks').createS3Event;
const event = createS3Event({
  Records: [{
    eventName: 'ObjectCreated:Put',
    s3: {
      bucket: {
        name: 'my-bucket-name'
      },
      object: {
        key: 'object-key'
      }
    }
  }]
});
```

### Scheduled

```js
const createScheduledEvent = require('aws-event-mocks').createScheduledEvent;
const event = createScheduledEvent({
  region: 'us-west-2'
});
```
