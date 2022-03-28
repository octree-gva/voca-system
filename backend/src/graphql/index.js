const instance = require("../api/instance/graphql");
const usersPermissions = require("../extensions/users-permissions/graphql");

const extensions = [instance, usersPermissions];

module.exports = ({ strapi }) => {
  const extensionService = strapi.plugin("graphql").service("extension");
  extensions.forEach((extension) => {
    if (Array.isArray(extension)) extension.forEach(extensionService.use);
    else extensionService.use(extension);
  });
};
