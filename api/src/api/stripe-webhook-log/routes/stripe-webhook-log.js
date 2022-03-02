'use strict';

/**
 * stripe-webhook-log router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::stripe-webhook-log.stripe-webhook-log');
