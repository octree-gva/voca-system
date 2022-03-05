require("./helpers/useStrapi");
const fs = require("fs");
const https = require("https");
const httpsBoot = require("../src/https-boot");
it("strapi is defined", async () => {
  expect(strapi).toBeDefined();
  const listenMock = jest.fn();
  jest
    .spyOn(https, "createServer")
    .mockImplementationOnce(() => ({ listen: listenMock }));
  jest
    .spyOn(fs, "readFileSync")
    .mockImplementationOnce((x) => x)
    .mockImplementationOnce((x) => x);
  await httpsBoot(strapi);
  expect(https.createServer).toHaveBeenCalledWith(
    { cert: "./localhost.pem", key: "./localhost-key.pem" },
    expect.anything()
  );
});
