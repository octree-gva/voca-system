"use strict";

const {
  winston,
  formats: { prettyPrint },
} = require("@strapi/logger");
const TimescaleLogger = require("@octree/strapi-timescale-logger");

module.exports = ({ env }) => {
  const databaseConfig = require(`./env/${env("NODE_ENV")}/database.js`);
  return {
    transports: [
      new winston.transports.Console({
        level: "http",
        stderrLevels: ["error", "debug", "info"],
        format: winston.format.combine(
          prettyPrint({ timestamps: "YYYY-MM-DD hh:mm:ss.SSS" })
        ),
      }),
      new TimescaleLogger({
        level: "http",
        knexConfig: databaseConfig({ env })?.connection,
        silent: ["development", "test"].includes(env("NODE_ENV")),
      }),
    ],
  };
};
