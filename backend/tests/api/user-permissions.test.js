const request = require("supertest");
require("../helpers/useStrapi");
const {
  create: createUser,
  build: buildUser,
} = require("../factories/userPermission");

it("should login user and return jwt token", async () => {
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

it("should return users data for authenticated user", async () => {
  const user = await createUser();
  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });
  await request(strapi.server.httpServer)
    .get("/api/users/me")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + jwt)
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body).toBeDefined();
      expect(data.body.id).toBe(user.id);
      expect(data.body.username).toBe(user.username);
      expect(data.body.email).toBe(user.email);
    });
});
