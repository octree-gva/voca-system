const dns = require("dns");

const lookupURL = async (url) => {
  const options = {
    family: 4,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  return new Promise((resolve, reject) => {
    dns.lookup(url, options, (err, address, family) => {
      if (err) return reject(err);
      return resolve({ ip: address, version: family });
    });
  });
};

const onlyAdmin = {
  name: "api::account.account-team",
  config: {
    model: "api::decidim.instance",
    foreignKey: "account",
    scope: "administrators",
  },
};
module.exports = ({ nexus, strapi }) => ({
  types: [
    nexus.objectType({
      name: "DNSLookup",
      definition(t) {
        t.string("ip");
        t.string("version");
      },
    }),

    nexus.extendType({
      type: "Instance",
      definition(t) {
        /** Resolve administratorAccounts fields in login and registration  */
        t.field("customDomainLookup", {
          description:
            "IP after a DNS check over the customDomain field. Return null if no customDomain is present.",
          type: "DNSLookup",
          resolve: async (root) => {
            const data = await strapi.entityService.findOne(
              "api::decidim.instance",
              root.id,
              {
                populate: [],
              }
            );
            if (!data.customDomain) return undefined;
            return await lookupURL(data.customDomain);
          },
        });
      },
    }),
  ],
  resolvers: {},
  resolversConfig: {
    "Mutation.createInstance": {
      policies: [onlyAdmin],
    },
    "Mutation.updateInstance": {
      policies: [onlyAdmin],
    },
    "Query.instances": {
      policies: [onlyAdmin],
    },
    "Query.instance": {
      policies: [onlyAdmin],
    },
  },
});
