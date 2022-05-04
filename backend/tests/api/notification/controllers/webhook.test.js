const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createInstance } = require("../../../factories/instances");
const {
  create: createUser,
  createAdmin,
} = require("../../../factories/userPermission");
describe("controller/api::notification.webhook", () => {
  describe("find", () => {
    it("forbids non-administrators to find", async () => {
      const user = await createUser();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });
      await request(strapi.server.httpServer)
        .get("/api/webhooks")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + jwt)
        .expect(403);
    });
    it("forbids administrators to find", async () => {
      const user = await createAdmin();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });
      await request(strapi.server.httpServer)
        .get("/api/webhooks")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + jwt)
        .expect(403);
    });
    it("forbids public to find", async () => {
      await request(strapi.server.httpServer)
        .get("/api/webhooks")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .expect(403);
    });
  });
  describe("handleOne", () => {
    it("returns 404 if the instance don't exists", async () => {
      await createInstance({ instanceUUID: "1234-1234-1234-1234" });
      await request(strapi.server.httpServer)
        .post("/api/decidim/webhooks/0000-0000-0000-0000")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          event_type: "decidim.install",
          content: { msg: "triggered" },
          content_hmac: "sig",
        })
        .expect(404);
    });
    it("creates a webhook entity for the given instance uuid", async () => {
      await createInstance({ instanceUUID: "1234-1234-1234-1234" });
      await request(strapi.server.httpServer)
        .post("/api/decidim/webhooks/1234-1234-1234-1234")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          event_type: "decidim.install",
          content: { msg: "triggered" },
          content_hmac: "sig",
        })
        .expect(200)
        .then((data) => {
          const { content, id, status } = data.body;
          expect(id).toEqual(expect.any(Number));
          expect(content.msg).toBe("triggered");
          expect(status).toBe("completed");
        });
    });
  });
});
