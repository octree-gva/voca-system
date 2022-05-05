const request = require("supertest");
require("../../../helpers/useStrapi");
const {
  create: createUser,
  build: buildUser,
} = require("../../../factories/userPermission");

describe("controller/plugin::users-permissions", () => {
  describe("POST /api/auth/local", () => {
    it("login user and return jwt token", async () => {
      /** Creates a new user and save it to the database */
      const user = await createUser("authenticated", { password: "123123" });

      await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
        .post("/api/auth/local")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          identifier: user.email,
          password: "123123",
        })
        .expect("Content-Type", /json/)
        .expect(200)
        .then((data) => {
          expect(data.body.jwt).toBeDefined();
        });
    });
  });
  describe("POST /api/auth/local/register", () => {
    it("can register with email/password", async () => {
      /** Creates a new user and save it to the database */
      const { body } = await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
        .post("/api/auth/local/register")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          password: "123123",
          email: "user@voca.city",
          username: "user@voca.city",
        })
        .expect("Content-Type", /json/)
        .expect(200);
      expect(body).toMatchObject({
        user: expect.objectContaining({
          id: expect.any(Number),
          blocked: false,
          email: "user@voca.city",
          username: "user@voca.city",
        }),
      });
    });
    describe("return value of user registration", () => {
      let subject;
      beforeAll(async () => {
        const { body } = await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
          .post("/api/auth/local/register")
          .set("accept", "application/json")
          .set("Content-Type", "application/json")
          .send({
            password: "123123",
            email: "user+returns@voca.city",
            username: "user+returns@voca.city",
            firstName: "jane",
            lastName: "doe",
          });
        subject = body;
      });

      it("return a jwt", () =>
        expect(subject).toMatchObject({ jwt: expect.any(String) }));
      it("return the user's first and lastname", () =>
        expect(subject).toMatchObject({
          user: expect.objectContaining({
            firstName: "jane",
            lastName: "doe",
          }),
        }));
      it("does not return the user's admin_accounts or role", () =>
        expect(subject).toMatchObject({
          user: expect.not.objectContaining({
            admin_accounts: expect.anything(),
            role: expect.anything(),
          }),
        }));
    });
  });
  describe("GET /api/users/me", () => {
    describe("as authenticated", () => {
      let subject;
      let user;
      beforeAll(async () => {
        user = await createUser();
        const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
          id: user.id,
        });
        const { body } = await request(strapi.server.httpServer)
          .get("/api/users/me")
          .set("accept", "application/json")
          .set("Content-Type", "application/json")
          .set("Authorization", "Bearer " + jwt);
        subject = body;
      });

      it("gives id, email", async () => {
        expect(subject).toMatchObject({
          id: user.id,
          email: user.email,
        });
      });

      it("gives username, firstName and lastName", async () => {
        expect(subject).toMatchObject({
          lastName: user.lastName,
          firstName: user.firstName,
          username: user.username,
        });
      });
      it("gives administratorAccounts", async () => {
        expect(subject).toMatchObject({
          administratorAccounts: expect.any(Array),
        });
      });
    });
  });
});
