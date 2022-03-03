'use strict';

/**
 *  stripe-webhook-log controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stripe-webhook-log.stripe-webhook-log');
