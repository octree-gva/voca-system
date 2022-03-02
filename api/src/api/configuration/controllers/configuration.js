'use strict';

/**
 *  configuration controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::configuration.configuration');
