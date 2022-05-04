const instance = require("../api/decidim/graphql");
const notification = require("../api/notification/graphql");
const usersPermissions = require("../extensions/users-permissions/graphql");

const extensions = [instance, usersPermissions, notification];

module.exports = ({ strapi }) => {
  const extensionService = strapi.plugin("graphql").service("extension");
  extensions.forEach((extension) => {
    if (Array.isArray(extension)) extension.forEach(extensionService.use);
    else extensionService.use(extension);
  });
};
