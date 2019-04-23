'use strict';

/* eslint-disable global-require */

const merge = require('lodash/merge');
const has = require('lodash/has');
const get = require('lodash/get');
const fs = require('fs');
const path = require('path');


const dictionary = {
  'aws:sns': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/sns.json'), 'utf-8')),
  'aws:sqs': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/sqs.json'), 'utf-8')),
  'aws:apiGateway': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/apiGateway.json'), 'utf-8')),
  'aws:scheduled': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/scheduled.json'), 'utf-8')),
  'aws:s3': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/s3.json'), 'utf-8')),
  'aws:kinesis': JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../events/aws/kinesis.json'), 'utf-8')),
};

module.exports = function createEvent(config) {
  const event = get(dictionary, config.template, {});
  return has(config, 'merge') ? merge({}, event, config.merge) : event;
};
