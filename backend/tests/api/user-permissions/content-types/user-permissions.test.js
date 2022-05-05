const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createUser } = require("../../../factories/userPermission");

describe("content-type/plugin::users-permissions", () => {
  it("create an account after success", async () => {
    const user = await createUser();
    const savedUser = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      user.id,
      { populate: ["administratorAccounts"] }
    );
    expect(savedUser.administratorAccounts).toBeDefined();
    expect(savedUser.administratorAccounts.length).toBe(1);
  });
});
