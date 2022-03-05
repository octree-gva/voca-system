const Strapi = require("@strapi/strapi");
const fs = require("fs");
const path = require("path");
let instance;
async function setupStrapi() {
  process.env = {
    HOST: "0.0.0.0",
    PORT: "1330",
    DATABASE_FILENAME: ".tmp/test-data.db",
    NODE_ENV: "test",
  };

  if (instance) {
    return instance;
  }
  await Strapi({ dirs: [path.join(__dirname, "..", "..", "src")] }).load();
  instance = strapi;

  await instance.server.mount();
  return instance;
}

async function cleanupStrapi() {
  const dbFile = path.join(
    __dirname,
    "..",
    "..",
    "config",
    "env",
    process.env.DATABASE_FILENAME || ".tmp/test-data.db"
  );
  //close server to release the db-file
  await strapi.server.httpServer.close();

  // close the connection to the database
  await strapi.db.connection.destroy();
  //   //delete test database after all tests have completed
  if (!!dbFile) {
    if (fs.existsSync(dbFile)) {
      fs.unlinkSync(dbFile);
    } else {
      throw new Error(`${dbFile} does not exists`);
    }
  }
  return Promise.resolve();
}

module.exports = { setupStrapi, cleanupStrapi };
