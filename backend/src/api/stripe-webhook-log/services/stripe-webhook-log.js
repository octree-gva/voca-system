'use strict';

/**
 * stripe-webhook-log service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::stripe-webhook-log.stripe-webhook-log');
