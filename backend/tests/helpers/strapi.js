const Strapi = require("@strapi/strapi");
const fs = require("fs");
const path = require("path");
const { create: createConfig } = require("../factories/jelastic-config");
const { create: createManifest } = require("../factories/jelastic-manifest");
let instance;
async function setupStrapi() {
  process.env = {
    HOST: "0.0.0.0",
    PORT: "1330",
    DATABASE_FILENAME: process.env.DATABASE_FILENAME || ".tmp/test-data.db",
    NODE_ENV: "test",
    JWT_SECRET: "1da2ff07-e7b8-475e-b205-3a47adec7399",
    API_TOKEN_SALT: "2a5173477fc560075a50e7883c8f93f5",
  };

  if (instance) {
    return instance;
  }
  await Strapi({ dirs: [path.join(__dirname, "..", "..", "src")] }).load();
  await createConfig();
  await createManifest();
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
  //   delete test database after all tests have completed
  if (!!dbFile) {
    if (fs.existsSync(dbFile)) {
      fs.unlinkSync(dbFile);
    } else {
      throw new Error(`${dbFile} does not exists`);
    }
  }
  instance = undefined;
  return Promise.resolve();
}

module.exports = { setupStrapi, cleanupStrapi };
