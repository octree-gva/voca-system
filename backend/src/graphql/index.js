const jelastic = require("../api/jelastic/graphql");
const instance = require("../api/instance/graphql");

const extensions = [jelastic, instance];

module.exports = ({ strapi }) => {
  const extensionService = strapi.plugin("graphql").service("extension");
  extensions.forEach((extension) => {
    if (Array.isArray(extension)) extension.forEach(extensionService.use);
    else extensionService.use(extension);
  });
};
