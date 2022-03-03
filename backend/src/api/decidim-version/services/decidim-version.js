'use strict';

/**
 * decidim-version service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::decidim-version.decidim-version');
