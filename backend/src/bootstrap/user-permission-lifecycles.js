module.exports = ({ strapi }) =>
  strapi.db.lifecycles.subscribe({
    models: ["plugin::users-permissions.user"],
    async afterCreate(event) {
      const { result: userCreated } = event;
      // Add default admininistrator account
      const account = await strapi.query("api::account.account").create({
        data: {
          creator: userCreated,
          administrators: [userCreated],
          title: userCreated.firstName
            ? `${userCreated.firstName}'s Workspace`
            : "Default workspace",
        },
        populate: [],
      });
      userCreated.administratorAccounts = [account];
    },
  });
