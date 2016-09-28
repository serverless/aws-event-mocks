'use strict';

const merge = require('lodash/merge');
const snsTemplate = require('./eventTemplates/sns.json');

module.exports = {
  createSnsEvent: function (overwrites) {
    return merge(snsTemplate, overwrites);
  },
};
