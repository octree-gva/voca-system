"use strict";
const httpsBoot = require("./https-boot");
const jelasticTypes = require("./api/jelastic/config/graphql.types");
const jelasticResolvers = require("./api/jelastic/config/graphql.resolvers");
module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Register custom Graphql types
    const extension = ({ nexus }) => {
      const {
        Query: jelasticQueries = {},
        Mutation: jelasticMutations = {},
        resolversConfig: jelasticConfig = {},
      } = jelasticResolvers({ strapi, nexus });
      return {
        types: [...jelasticTypes({ strapi, nexus })],
        resolvers: {
          Query: { ...jelasticQueries },
          Mutation: { ...jelasticMutations },
        },
        resolversConfig: { ...jelasticConfig },
      };
    };
    strapi.plugin("graphql").service("extension").use(extension);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    await Promise.all([
      process.env.NODE_ENV === "development"
        ? httpsBoot(strapi)
        : Promise.resolve(),
    ]);
  },
};
