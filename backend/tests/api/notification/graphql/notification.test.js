const request = require("supertest");
require("../../../helpers/useStrapi");
const {
  create: createNotification,
} = require("../../../factories/notifications");
const { create: createUser } = require("../../../factories/userPermission");
const { create: createConfig } = require("../../../factories/jelastic-config");
const NOTIFICATION_QUERY = `
query Notifications($filters: NotificationFiltersInput!) {
  notifications(filters: $filters, sort: "createdAt:desc") {
    data {
      id
      attributes {
        saga
        level
        content

      }
    }
  }
}
`.trim();
const queryNotifications = (jwt, filters) =>
  request(strapi.server.httpServer)
    .post("/graphql")
    .set("Authorization", `Bearer ${jwt}`)
    .send({
      query: NOTIFICATION_QUERY,
      variables: { filters },
    });
describe("graphql/api::notification.notification", () => {
  describe("Query.notification", () => {
    it("can not query notification with an instance is not administrator", async () => {
      const foreignNotification = await createNotification();
      const foreignInstance = foreignNotification.instance;
      const user = await createUser();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...user,
      });
      await queryNotifications(jwt, {
        instance: { id: { eq: foreignInstance.id } },
      })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.notifications).toBeFalsy();
        });
    });

    it("filters notification", async () => {
      const foreignNotification = await createNotification();
      const notification = await createNotification();
      const instance = await strapi.query("api::decidim.instance").findOne({
        where: { id: notification.instance.id },
        populate: ["creator", "creator.role"],
      });
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...instance.creator,
      });
      const expected = [
        {
          attributes: {
            content: notification.content,
            level: notification.level,
            saga: notification.saga,
          },
          id: "" + notification.id,
        },
      ];
      const notExpected = [
        {
          attributes: {
            content: foreignNotification.content,
            level: foreignNotification.level,
            saga: foreignNotification.saga,
          },
          id: "" + foreignNotification.id,
        },
      ];
      await queryNotifications(jwt, {})
        .expect(200)
        .then(({ body }) => {
          expect(body.data.notifications.data).not.toEqual(
            expect.arrayContaining(notExpected)
          );
          expect(body.data.notifications.data).toEqual(
            expect.arrayContaining(expected)
          );
        });
    });
    it("can not query notification with an instance is not administrator", async () => {
      const foreignNotification = await createNotification();
      const foreignInstance = foreignNotification.instance;
      const user = await createUser();
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        ...user,
      });
      await queryNotifications(jwt, {
        instance: { id: { eq: foreignInstance.id } },
      })
        .expect(200)
        .then(({ body }) => {
          expect(body.data.notifications).toBeFalsy();
        });
    });
  });
});
