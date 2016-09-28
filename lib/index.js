'use strict';

const merge = require('lodash/merge');
const snsTemplate = require('./eventTemplates/sns.json');
const apigTemplate = require('./eventTemplates/apig.json');
const scheduledTemplate = require('./eventTemplates/scheduled.json');
const s3Template = require('./eventTemplates/s3.json');

module.exports = {
  createSnsEvent(overwrites) {
    return merge(snsTemplate, overwrites);
  },
  createApigEvent(overwrites) {
    return merge(apigTemplate, overwrites);
  },
  createScheduledEvent(overwrites) {
    return merge(scheduledTemplate, overwrites);
  },
  createS3Event(overwrites) {
    return merge(s3Template, overwrites);
  },
};
