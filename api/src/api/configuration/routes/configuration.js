'use strict';

/**
 * configuration router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::configuration.configuration');
