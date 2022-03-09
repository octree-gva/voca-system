require("../../../helpers/useStrapi");
const jelasticConfigFactory = require("../factories/jelastic-config");
const mockContext = () => {
  const context = {
    is: jest.fn((x) => true),
    throw: jest.fn(),
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
  return context;
};
describe("controller.jelastic.jelastic", () => {
  beforeEach(async () => {
    strapi.service("api::jelastic.jelastic").deploy = jest.fn(async (x) => x);
    strapi.service("api::account.account").create = jest.fn(async (x) => x);

    strapi.service("api::jelastic.environment").create = jest.fn(
      async (x) => x
    );
    await strapi.query("api::jelastic-config.jelastic-config").create({
      data: jelasticConfigFactory(),
    });
  });

  it("should call environment.create and account.create on POST", async () => {
    const createInstance = strapi.controller(
      "api::jelastic.jelastic"
    ).createInstance;
    const context = mockContext();
    await createInstance(context, jest.fn());
    expect(context.status).toHaveBeenCalledWith(201);
    expect(strapi.service("api::account.account").create).toHaveBeenCalledWith(
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

  it("should call jelastic.environment.deploy with jelastic.account.create result", async () => {
    const mockUser = {
      id: "id",
      foo: "bar",
    };
    strapi.service("api::account.account").create.mockResolvedValue(mockUser);
    const createInstance = strapi.controller(
      "api::jelastic.jelastic"
    ).createInstance;
    const context = mockContext();
    await createInstance(context, jest.fn());
    expect(
      strapi.service("api::jelastic.environment").create
    ).toHaveBeenCalledWith(expect.objectContaining({ current_user: mockUser }));
  });

  it("should accept only json Content-Type", async () => {
    const createInstance = strapi.controller(
      "api::jelastic.jelastic"
    ).createInstance;
    const context = { ...mockContext(), is: jest.fn().mockReturnValue(false) };
    await createInstance(context, jest.fn());
    expect(context.throw).toHaveBeenCalledWith(415, "json only!");
  });

  it("return status 400 and swallow errors if create account fails", async () => {
    const createInstance = strapi.controller(
      "api::jelastic.jelastic"
    ).createInstance;
    const context = mockContext();
    strapi.service("api::account.account").create.mockImplementationOnce(() => {
      throw new Error("mock_error");
    });
    await createInstance(context, jest.fn());
    expect(context.throw).toHaveBeenCalledWith(500, "Error: mock_error");
    expect(context.send).toHaveBeenCalledTimes(0);
  });
});
