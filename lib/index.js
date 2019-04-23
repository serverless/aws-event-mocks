'use strict';

/* eslint-disable global-require */

const merge = require('lodash/merge');
const has = require('lodash/has');
const get = require('lodash/get');
const fs = require('fs');
const path = require('path');


const dictionary = {
  'aws:sns': fs.readFileSync(path.resolve(__dirname, '../events/aws/sns.json'), 'utf-8'),
  'aws:sqs': fs.readFileSync(path.resolve(__dirname, '../events/aws/sqs.json'), 'utf-8'),
  'aws:apiGateway': fs.readFileSync(
      path.resolve(__dirname, '../events/aws/apiGateway.json'), 'utf-8'),
  'aws:scheduled': fs.readFileSync(
      path.resolve(__dirname, '../events/aws/scheduled.json'), 'utf-8'),
  'aws:s3': fs.readFileSync(path.resolve(__dirname, '../events/aws/s3.json'), 'utf-8'),
  'aws:kinesis': fs.readFileSync(path.resolve(__dirname, '../events/aws/kinesis.json'), 'utf-8'),
};

module.exports = function createEvent(config) {
  const event = get(dictionary, config.template, {});
  return has(config, 'merge') ? merge({}, event, config.merge) : event;
};
