const request = require("supertest");
require("../../../helpers/useStrapi");
const dns = require("dns");
const {
  build: buildInstance,
  create: createInstance,
} = require("../../../factories/instances");
const { create: createUser } = require("../../../factories/userPermission");
const { create: createAccount } = require("../../../factories/account");

describe("graphql/api::decidim.instance", () => {
  beforeEach(() => {
    strapi.service("api::decidim.deployment").deployNew = jest.fn();
    dns.lookup = jest.fn((hostname, family, callback) => {
      callback(undefined, "xxx.x.x.x", "4");
    });
  });

  describe("queryInstance", () => {
    const getSubject = async (overrides = {}) => {
      const currentUser = await createUser();
      const instance = createInstance({
        creator: currentUser,
        account: await createAccount({
          creator: currentUser,
          administrators: [currentUser],
        }),
        ...overrides,
      });
      return instance;
    };

    describe("customDomain", () => {
      const QUERY_DOMAIN = `
query QueryInstanceDomain($id: ID!) {
  instance(id: $id) {
    data {
      id
      attributes {
        customDomain,
        customDomainLookup {
          ip
          version
        }
      }
    }
  }
}
`.trim();

      const queryCustomDomain = (jwt, id) =>
        request(strapi.server.httpServer)
          .post("/graphql")
          .set("Authorization", `Bearer ${jwt}`)
          .send({
            query: QUERY_DOMAIN,
            variables: { id },
          });
      it("with a customDomain, it calls a dns.lookup on query", async () => {
        const { account, creator, ...instance } = await getSubject({
          customDomain: "colony.community",
        });
        const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
          ...creator,
        });
        const { body } = await queryCustomDomain(jwt, instance.id);
        expect(body).toMatchObject({
          data: expect.objectContaining({
            instance: expect.objectContaining({
              data: expect.objectContaining({
                attributes: expect.objectContaining({
                  customDomain: "colony.community",
                  customDomainLookup: {
                    ip: "xxx.x.x.x",
                    version: "4",
                  },
                }),
              }),
            }),
          }),
        });
      });
      it("without a customDomain, customDomainLookup is undefined", async () => {
        const { account, creator, ...instance } = await getSubject({
          customDomain: null,
        });
        const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
          ...creator,
        });
        const { body } = await queryCustomDomain(jwt, instance.id);
        expect(body).toMatchObject({
          data: expect.objectContaining({
            instance: expect.objectContaining({
              data: expect.objectContaining({
                attributes: expect.objectContaining({
                  customDomain: null,
                  customDomainLookup: null,
                }),
              }),
            }),
          }),
        });
      });
    });
  });

  describe("createInstance", () => {
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
