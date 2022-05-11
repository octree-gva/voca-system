const request = require("supertest");
require("../../../helpers/useStrapi");

const { build: buildInstance } = require("../../../factories/instances");
const { create: createUser } = require("../../../factories/userPermission");
const { create: createAccount } = require("../../../factories/account");

describe("graphql/api::decidim.instance", () => {
  const getSubject = async () => {
    const currentUser = await createUser();
    const { title, subdomain, creator, account } = buildInstance({
      creator: currentUser,
      account: await createAccount({
        creator: currentUser,
        administrators: [currentUser],
      }),
    });
    return { title, subdomain, creator, account };
  };

  beforeEach(() => {
    strapi.service("api::decidim.deployment").deployNew = jest.fn();
  });
  describe("createInstance", () => {
    const CREATE_INSTANCE = `
mutation CreateInstance($data: InstanceInput!) {
  createInstance(data: $data) {
    data {
      id
      attributes {
        title
        subdomain
        envName
        instanceUUID
        status
        default_locale
        available_locales
        currency
        account {
          data {
            id
          }
        }
      }
    }
  }
}
`.trim();
    const mutationCreateInstance = (jwt, data) =>
      request(strapi.server.httpServer)
        .post("/graphql")
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          query: CREATE_INSTANCE,
          variables: { data },
        });
    it("requires an account id", async () => {
      const { account, creator, ...instance } = await getSubject();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...creator,
      });
      const { body } = await mutationCreateInstance(jwt, {
        ...instance,
        creator: creator.id,
      });
      expect(body).toMatchObject({
        errors: expect.arrayContaining([
          expect.objectContaining({
            extensions: expect.objectContaining({ code: "BAD_USER_INPUT" }),
            message: expect.any(String),
          }),
        ]),
        data: { createInstance: null },
      });
    });
    it("returns instance attributes", async () => {
      const { creator, account, ...instance } = await getSubject();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...creator,
      });

      const { body } = await mutationCreateInstance(jwt, {
        ...instance,
        creator: creator.id,
        account: account.id,
      });
      expect(body).toMatchObject({
        data: {
          createInstance: {
            data: expect.objectContaining({
              attributes: expect.objectContaining({
                subdomain: instance.subdomain,
                envName: expect.any(String),
              }),
            }),
          },
        },
      });
    });
    it("deploys an instance to jelastic", async () => {
      const { creator, account, ...instance } = await getSubject();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...creator,
      });

      await mutationCreateInstance(jwt, {
        ...instance,
        creator: creator.id,
        account: account.id,
      });
      expect(
        strapi.service("api::decidim.deployment").deployNew
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          ...instance,
          creator: expect.objectContaining({
            id: creator.id,
            email: creator.email,
          }),
          account: expect.objectContaining({ id: account.id }),
        })
      );
    });
  });
});
