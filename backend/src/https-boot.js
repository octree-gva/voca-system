const https = require("https");
const fs = require("fs");

module.exports = async function (strapi) {
  if (process.env.NODE_ENV !== "development") return Promise.resolve();
  const { PORT: strapiPort = "3000" } = process.env;
  const httpsPort = Math.max(parseInt(strapiPort, 10) + 1, 1300);
  const options = {
    key: fs.readFileSync("./localhost-key.pem"),
    cert: fs.readFileSync("./localhost.pem"),
  };
  https.createServer(options, strapi.server.app.callback()).listen(httpsPort);
  strapi.log.info("To access the https server ⚡️, go to:");
  strapi.log.info(`https://localhost:${httpsPort}`);
  strapi.log.info(`https://localhost:${httpsPort}/admin`);
  return Promise.resolve();
};
