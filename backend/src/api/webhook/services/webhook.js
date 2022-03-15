'use strict';

/**
 * webhook service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::webhook.webhook');
