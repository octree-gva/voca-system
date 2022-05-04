const chance = require("chance").Chance();
const userPermissionFactory = {
  build: (overwrites = {}) => {
    const email = chance.email();
    return {
      username: chance.string({ alpha: true, length: 128 }),
      email: email,
      provider: "local",
      password: chance.string({ length: 12 }),
      confirmed: true,
      blocked: false,
      ...overwrites,
    };
  },
  create: async (role = "authenticated", overwrites = {}) => {
    const authenticatedRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: role }, populate: [] });

    return await strapi.plugins["users-permissions"].services.user.add({
      role: authenticatedRole,
      ...userPermissionFactory.build(overwrites),
    });
  },
  createAdmin: async (overwrites = {}) => {
    const adminRole = await strapi.admin.services.role.getSuperAdmin();
    return await strapi.admin.services.user.create({
      email: chance.email(),
      isActive: true,
      roles: [adminRole.id],
      password: chance.string({ length: 12 }),
      registrationToken: null,
    });
  },
};
module.exports = userPermissionFactory;
