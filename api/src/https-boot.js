const https = require("https");
const fs = require("fs");

module.exports = async function (strapi) {
  if (process.env.NODE_ENV !== "development") return Promise.resolve();
  const options = {
    key: fs.readFileSync("./localhost-key.pem"),
    cert: fs.readFileSync("./localhost.pem"),
  };
  https.createServer(options, strapi.server.app.callback()).listen(1338);
  return Promise.resolve();
};
