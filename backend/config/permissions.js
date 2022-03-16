"use stric";

const publicPerms = [
  "api::instance.instance.isSubdomainAvailable",
  "api::instance.instance.firstInstall",
];

const authenticated = [];

module.exports = {
  roles: {
    public: publicPerms,
    authenticated,
  },
};
