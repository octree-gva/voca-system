const { setupStrapi, cleanupStrapi } = require("./strapi");
jest.setTimeout(15000);
beforeAll(async () => {
  await setupStrapi();
});
afterAll(async () => {
  jest.resetAllMocks();
  await cleanupStrapi();
});
