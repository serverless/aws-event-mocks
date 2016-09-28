# AWS Event Mocks

## Usage

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
