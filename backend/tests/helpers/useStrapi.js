const { setupStrapi, cleanupStrapi } = require("./strapi");

jest.setTimeout(22000);
beforeAll(async () => {
  await setupStrapi();
});
afterAll(async () => {
  jest.resetAllMocks();
  await cleanupStrapi();
});
