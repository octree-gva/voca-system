const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createInstance } = require("../../../factories/instances");

describe("controller/api::decidim.subdomain", () => {
  describe("decidim/subdomain", () => {
    it("return {ok: true} when available", async () => {
      await request(strapi.server.httpServer)
        .post("/api/decidim/subdomain")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          subdomain: "something-new",
        })
        .expect(200)
        .then((data) => {
          const { ok } = data.body;
          expect(ok).toBeTruthy();
        });
    });
    it("return {ok: false} when already used", async () => {
      await createInstance({ subdomain: "taken-subdomain" });
      await request(strapi.server.httpServer)
        .post("/api/decidim/subdomain")
        .set("accept", "application/json")
        .set("Content-Type", "application/json")
        .send({
          subdomain: "taken-subdomain",
        })
        .expect(200)
        .then((data) => {
          const { ok } = data.body;
          expect(ok).toBeFalsy();
        });
    });
  });
});
