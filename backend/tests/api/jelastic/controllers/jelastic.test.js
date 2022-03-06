require("../../../helpers/useStrapi");

describe("POST /instance", () => {
  it("should call environment.create and account.create on POST", async () => {
    strapi.service("api::jelastic.account").create = jest.fn(async (x) => x);
    strapi.service("api::jelastic.environment").create = jest.fn(
      async (x) => x
    );

    const createInstance = strapi.controller(
      "api::jelastic.jelastic"
    ).createInstance;
    const context = {
      is: jest.fn((x) => true),
      throw: () => {
        throw new Error("error");
      },
      query: {},
      request: {
        body: {
          subdomain: "subdomain",
          email: "email",
          password: "password",
          password_confirmation: "password_confirmation",
        },
      },
      status: jest.fn((x) => context),
      send: jest.fn((x) => context),
    };
    await createInstance(context, jest.fn());
    expect(context.status).toHaveBeenCalledWith(201);
    expect(strapi.service("api::jelastic.account").create).toHaveBeenCalledWith(
      expect.objectContaining({
        password: "password",
        email: "email",
        password_confirmation: "password_confirmation",
      })
    );
    expect(
      strapi.service("api::jelastic.environment").create
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        subdomain: "subdomain",
        current_user: expect.anything(),
      })
    );
  });
});
