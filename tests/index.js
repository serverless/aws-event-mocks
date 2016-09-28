'use strict';

const expect = require('chai').expect;

const createSnsEvent = require('../lib').createSnsEvent;
const createApigEvent = require('../lib').createApigEvent;
const createS3Event = require('../lib').createS3Event;
const createScheduledEvent = require('../lib').createScheduledEvent;

describe('#AWS Event Mocks()', function () {
  describe('createSnsEvent()', function () {
    it('should return SNS mocked event', function () {
      const event = createSnsEvent({
        Records: [{
          Sns: {
            Message: 'trigger-email',
          },
        }],
      });

      expect(event.Records[0].Sns.Message).to.equal('trigger-email');
      expect(event.Records[0].Sns.Type).to.equal('Notification');
    });
  });

  describe('createApigEvent()', function () {
    it('should return APIG mocked event', function () {
      const event = createApigEvent({
        body: {
          first_name: 'Sam',
          last_name: 'Smith',
        },
      });

      expect(event.body.first_name).to.equal('Sam');
      expect(event.body.last_name).to.equal('Smith');
      expect(event.method).to.equal('GET');
    });
  });

  describe('createS3Event()', function () {
    it('should return S3 mocked event', function () {
      const event = createS3Event({
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
      });

      expect(event.Records[0].s3.bucket.name).to.equal('my-bucket-name');
      expect(event.Records[0].s3.object.key).to.equal('object-key');
      expect(event.Records[0].eventName).to.equal('ObjectCreated:Put');
    });
  });

  describe('createScheduledEvent()', function () {
    it('should return Scheduled mocked event', function () {
      const event = createScheduledEvent({
        region: 'us-west-2',
      });

      expect(event.region).to.equal('us-west-2');
      expect(event['detail-type']).to.equal('Scheduled Event');
    });
  });
});
