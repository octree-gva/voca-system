'use strict';

/**
 * instance router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::instance.instance');
