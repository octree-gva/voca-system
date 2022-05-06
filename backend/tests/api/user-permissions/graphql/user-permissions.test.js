const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createUser } = require("../../../factories/userPermission");

describe("graphql/plugin::users-permissions", () => {
  describe("meQuery", () => {
    const ME_QUERY = `
query Me {
  me {
    id
    username
    email
    confirmed
    blocked
    role {
      id
      type
    }
    administratorAccounts {
      id
      attributes {
        title
      }
    }
    lastName
    firstName
  }
}

`.trim();
    const queryMe = (jwt) =>
      request(strapi.server.httpServer)
        .post("/graphql")
        .set("Authorization", `Bearer ${jwt}`)
        .send({
          query: ME_QUERY,
        });

    describe("returns after success", () => {
      let subject;
      let user;
      beforeAll(async () => {
        user = await createUser();
        const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
          ...user,
        });
        const {
          body: {
            data: { me },
          },
        } = await queryMe(jwt);
        subject = me;
      });
      it("gives firstName and lastName", () => {
        expect(subject).toMatchObject({
          firstName: user.firstName,
          lastName: user.lastName,
        });
      });
      it("gives by default authenticated role", () => {
        expect(subject).toMatchObject({
          role: expect.objectContaining({
            type: "authenticated",
          }),
        });
      });
      it("gives administratorAccounts", () => {
        expect(subject).toMatchObject({
          administratorAccounts: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
            }),
          ]),
        });
      });
    });
  });
  describe("register mutation", () => {
    const REGISTER_QUERY = `
mutation RegisterUser($email: String!, $password: String!) {
  register(input: { username: $email, email: $email, password: $password }) {
    jwt
    user {
      id
      firstName
      lastName
      email
      confirmed
      blocked
      role {
        id
        name
        description
      }
      administratorAccounts {
        id
        attributes {
          title
        }
      }
    }
  }
}
`.trim();
    const mutateRegister = (variables) =>
      request(strapi.server.httpServer).post("/graphql").send({
        query: REGISTER_QUERY,
        variables,
      });
    describe("returns after success", () => {
      let subject;
      beforeAll(async () => {
        const {
          body: { data },
        } = await mutateRegister({
          email: "hello@voca.city",
          password: "C1H2Lala",
        });
        subject = data;
      });

      it("gives back email", () => {
        expect(subject).toMatchObject({
          register: { user: { email: "hello@voca.city" } },
        });
      });
      it("gives back administratorAccounts", () => {
        expect(subject).toMatchObject({
          register: {
            user: {
              administratorAccounts: expect.arrayContaining([
                expect.objectContaining({
                  id: expect.any(String),
                }),
              ]),
            },
          },
        });
      });
      it("does NOT gives back role (bug)", () => {
        // Strapi have a bug in user-permissions: it does not populate role by default.
        // Knowing this bug, we can write a test to check consistency
        expect(subject).toMatchObject({
          register: {
            user: {
              role: null,
            },
          },
        });
      });
    });
    it("raises error if email is token", async () => {
      await mutateRegister({
        email: "uniq-email@voca.city",
        password: "C1H2Lala",
      });
      const { body: secondTry } = await mutateRegister({
        email: "uniq-email@voca.city",
        password: "C1H2Lala",
      });
      expect(secondTry).toMatchObject({
        data: null,
        errors: expect.any(Array),
      });
    });
  });
});
