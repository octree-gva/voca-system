'use strict';

/**
 *  webhook controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::webhook.webhook');
