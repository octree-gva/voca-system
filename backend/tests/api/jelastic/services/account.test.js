const request = require("supertest");
require("../../../helpers/useStrapi");
let i = 0;

describe("account.create()", () => {
  let jelastic;
  let createAccount;
  const goodParams = () => ({
    password: "Ku4jahth2aim!",
    password_confirmation: "Ku4jahth2aim!",
    email: `tester${++i}@voca.city`,
  });
  beforeAll(async () => {
    await strapi.plugins["users-permissions"].services.user.add({
      username: "tester",
      email: "tester@voca.city",
      provider: "local",
      password: "1234abc",
      confirmed: true,
      blocked: null,
    });
    strapi.plugins["users-permissions"].services.user.add = jest.fn((x) => ({
      ...x,
      id: 1,
    }));
  });
  beforeEach(async () => {
    jelastic = strapi?.service("api::jelastic.account");
    createAccount = jelastic?.create;
  });
  it("is defined", () => {
    expect(createAccount).toBeDefined();
  });
  it("requires a password", async () => {
    expect(
      createAccount({ ...goodParams(), password: undefined })
    ).rejects.toBeTruthy();
  });
  it("requires a password with at least  10 chars", async () => {
    expect(
      createAccount({
        ...goodParams(),
        password: "Ad$23456",
        password_confirmation: "Ad$23456",
      })
    ).rejects.toThrow(
      expect.objectContaining({
        errors: ["password must be at least 10 characters"],
      })
    );
  });
  it("requires a password with a special chars", async () => {
    expect(
      createAccount({
        ...goodParams(),
        password: "Ad23456789101",
        password_confirmation: "Ad23456789101",
      })
    ).rejects.toThrow(
      expect.objectContaining({
        errors: [
          "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ],
      })
    );

    expect(
      createAccount({
        ...goodParams(),
        password: "Ad23456789101$",
        password_confirmation: "Ad23456789101$",
      })
    ).resolves.toBeTruthy();
  });

  it("'Ku4h2aim!' throws validation error", async () => {
    expect(
      createAccount({
        ...goodParams(),
        password: "Ku4h2aim!",
        password_confirmation: "Ku4h2aim!",
      })
    ).rejects.toBeTruthy();
  });

  it("requires a password_confirmation", async () => {
    expect(
      createAccount({ ...goodParams(), password_confirmation: undefined })
    ).rejects.toBeTruthy();
  });

  it("requires a uniq email", async () => {
    expect(
      createAccount({ ...goodParams(), email: "tester@voca.city" })
    ).rejects.toBeTruthy();
  });

  it("create a non-confirmed user", async () => {
    const payload = goodParams();
    const createdUser = await createAccount(payload);
    expect(
      strapi.plugins["users-permissions"].services.user.add
    ).toHaveBeenCalledWith({
      username: payload.email,
      email: payload.email,
      provider: "local",
      password: payload.password,
      confirmed: true,
      blocked: false,
    });
    expect(createdUser.id).toEqual(1);
  });
});
