'use strict';

/**
 * webhook router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::webhook.webhook');
