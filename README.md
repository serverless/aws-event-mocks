# AWS Event Mocks
A small library that includes details mocks of AWS Lambda event sources. Useful for use when unit testing your Lambda functions. Supported Event Sources are: SNS, API Gateway, S3, & Scheduled.

The library simply uses default event source mock templates and merge it with any overwrite you provide. [Check out the JSON template files](/events) to learn more about the data structure of each event source.

## Usage

### SNS

```js
const createEvent = require('aws-event-mocks');
const mocked = createEvent({
  template: 'aws:sns',
  merge: {
    Records: [{
      Sns: {
        Message: 'trigger-email'
      }
    }]
  }
});
```

### API Gateway

```js
const createEvent = require('aws-event-mocks');
const event = createEvent({
  template: 'aws:apiGateway',
  merge: {
    body: {
      first_name: 'Sam',
      last_name: 'Smith'
    }
  }
});
```

### S3

```js
const createEvent = require('aws-event-mocks');
const event = createEvent({
  template: 'aws:s3',
  merge: {
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
  }
});
```

### Scheduled

```js
const createEvent = require('aws-event-mocks');
const event = createEvent({
  template: 'aws:scheduled',
  merge: {
    region: 'us-west-2'
  }
});
```
