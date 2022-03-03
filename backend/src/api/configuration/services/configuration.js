'use strict';

/**
 * configuration service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::configuration.configuration');
