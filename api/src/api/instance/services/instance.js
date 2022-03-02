'use strict';

/**
 * instance service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::instance.instance');
