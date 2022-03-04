const request = require("supertest");
require("../helpers/useStrapi");
// user mock data
const mockUserData = {
  username: "tester",
  email: "tester@voca.city",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: null,
};

it("should login user and return jwt token", async () => {
  /** Creates a new user and save it to the database */
  await strapi.plugins["users-permissions"].services.user.add({
    ...mockUserData,
  });

  await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
    .post("/api/auth/local")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect("Content-Type", /json/)
    .expect(200)
    .then((data) => {
      expect(data.body.jwt).toBeDefined();
    });
});

it("should return users data for authenticated user", async () => {
  /** Gets the default user role */
  const defaultRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({}, []);

  const role = defaultRole ? defaultRole.id : null;
  expect(role).toBeDefined();

  const user = await strapi.plugins["users-permissions"].services.user.add({
    ...mockUserData,
    username: "tester2",
    email: "tester2@voc.city",
    role,
  });

  const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
    id: user.id,
  });

  await request(strapi.server.httpServer) // app server is an instance of Class: http.Server
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
