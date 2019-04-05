'use strict';

const expect = require('chai').expect;

const createEvent = require('../lib');

describe('#AWS Event Mocks()', function () {
  describe('createSnsEvent()', function () {
    it('should return SNS mocked event', function () {
      const event = createEvent({
        template: 'aws:sns',
        merge: {
          Records: [{
            Sns: {
              Message: 'trigger-email',
            },
          }],
        },
      });

      expect(event.Records[0].Sns.Message).to.equal('trigger-email');
      expect(event.Records[0].Sns.Type).to.equal('Notification');
    });
  });

  describe('createSqsEvent()', function () {
    it('should return SQS mocked event', function () {
      const event = createEvent({
        template: 'aws:sqs',
        merge: {
          Records: [{
            body: {
              foo: 'bar',
            },
          }],
        },
      });

      expect(event.Records[0].body.foo).to.equal('bar');
      expect(event.Records[0].eventSource).to.equal('aws:sqs');
    });
  });

  describe('createDynamoDbEvent()', function () {
    it('should return DynamoDb mocked event', function () {
      const event = createEvent({
        template: 'aws:sqs',
        merge: {
          Records: [{
            body: {
              foo: 'bar',
            },
          }],
        },
      });

      expect(event.Records[0].body.foo).to.equal('bar');
      expect(event.Records[0].eventSource).to.equal('aws:sqs');
    });
  });

  describe('createApigEvent()', function () {
    it('should return APIG mocked event', function () {
      const event = createEvent({
        template: 'aws:apiGateway',
        merge: {
          body: {
            first_name: 'Sam',
            last_name: 'Smith',
          },
        },
      });

      expect(event.body.first_name).to.equal('Sam');
      expect(event.body.last_name).to.equal('Smith');
      expect(event.method).to.equal('GET');
    });
  });

  describe('createS3Event()', function () {
    it('should return S3 mocked event', function () {
      const event = createEvent({
        template: 'aws:s3',
        merge: {
          Records: [{
            s3: {
              bucket: {
                name: 'my-bucket-name',
              },
              object: {
                key: 'object-key',
              },
            },
          }],
        },
      });

      expect(event.Records[0].s3.bucket.name).to.equal('my-bucket-name');
      expect(event.Records[0].s3.object.key).to.equal('object-key');
      expect(event.Records[0].eventName).to.equal('ObjectCreated:Put');
    });
    it('should return S3 mocked event without side-effect', function () {
      const event = createEvent({
        template: 'aws:s3',
        merge: {
          Records: [{
            s3: {
              bucket: {
                name: 'my-bucket-name',
              },
              object: {
                key: 'object-key',
              },
            },
          }],
        },
      });

      const event2 = createEvent({
        template: 'aws:s3',
        merge: {
          Records: [{
            s3: {
              bucket: {
                name: 'my-bucket-name',
              },
              object: {
                key: 'object-key-2',
              },
            },
          }],
        },
      });

      expect(event.Records[0].s3.bucket.name).to.equal('my-bucket-name');
      expect(event.Records[0].s3.object.key).to.equal('object-key');
      expect(event.Records[0].eventName).to.equal('ObjectCreated:Put');
    });
  });

  describe('createScheduledEvent()', function () {
    it('should return Scheduled mocked event', function () {
      const event = createEvent({
        template: 'aws:scheduled',
        merge: {
          region: 'us-west-2',
        },
      });

      expect(event.region).to.equal('us-west-2');
      expect(event['detail-type']).to.equal('Scheduled Event');
    });
  });

  describe('createKinesisEvent()', function () {
    it('should return Kinesis mocked event', function () {
      const event = createEvent({
        template: 'aws:kinesis',
        merge: {
          Records: [{
            kinesis: {
              data: new Buffer('kinesis test').toString('base64'),
            },
          }],
        },
      });

      expect(new Buffer(event.Records[0].kinesis.data, 'base64').toString('ascii'))
      .to.equal('kinesis test');
    });
  });
});
