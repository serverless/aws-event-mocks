'use strict';

/* eslint-disable global-require */

const merge = require('lodash/merge');
const has = require('lodash/has');
const get = require('lodash/get');

const dictionary = {
  'aws:sns': require('../events/aws/sns.json'),
  'aws:sqs': require('../events/aws/sqs.json'),
  'aws:apiGateway': require('../events/aws/apiGateway.json'),
  'aws:scheduled': require('../events/aws/scheduled.json'),
  'aws:s3': require('../events/aws/s3.json'),
  'aws:kinesis': require('../events/aws/kinesis.json'),
  'aws:dynamoDb': require('../events/aws/dynamoDb.json'),
};

module.exports = function createEvent(config) {
  const event = get(dictionary, config.template, {});
  return has(config, 'merge') ? merge({}, event, config.merge) : event;
};
