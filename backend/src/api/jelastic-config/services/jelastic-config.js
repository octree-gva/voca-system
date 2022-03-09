'use strict';

/**
 * jelastic-config service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jelastic-config.jelastic-config');
