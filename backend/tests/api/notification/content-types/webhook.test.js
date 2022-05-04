const request = require("supertest");
require("../../../helpers/useStrapi");
const { create: createWebhook } = require("../../../factories/webhooks");

describe("content-type/api::notification.webhook", () => {
  beforeEach(() => {
    strapi.service("api::notification.webhook").fire = jest.fn();
  });
  it("should fire api::notification.webhook service after creation", async () => {
    const webhook = await createWebhook();
    expect(
      strapi.service("api::notification.webhook").fire
    ).toHaveBeenCalledWith(
      expect.any(Object),
      webhook.eventType,
      webhook.content
    );
  });
});
