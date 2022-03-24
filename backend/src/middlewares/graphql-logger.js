"use strict";

const chalk = require("chalk");

module.exports = (_, { strapi }) => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Math.ceil(Date.now() - start);

    if (ctx.url === "/graphql") {
      const { operationName, variables, query } = ctx.request.body || {};
      const status = graphqlStatus(ctx.body);

      if (operationName)
        strapi.log.http(
          `${chalk.magenta(
            "GRAPHQL"
          )} ${operationName} (${delta} ms) ${graphqlCodeColor(status)}`,
          {
            meta: {
              operationName,
              variables,
              query,
              status,
              delta,
            },
          }
        );
    } else {
      strapi.log.http(
        `${ctx.method} ${ctx.url} (${delta} ms) ${httpCodeColor(ctx.status)}`
      );
    }
  };
};

const graphqlStatus = (response) => {
  if (!response) return "NOT FOUND";

  try {
    const { errors } = response ? JSON.parse(response) : {};
    if (errors) return "ERROR";
  } catch (error) {
    return "NOT JSON";
  }

  return "OK";
};

const graphqlCodeColor = (status) => {
  switch (status) {
    case "ERROR":
      return chalk.red(status);
    case "NOT_FOUND":
      return chalk.yellow(status);
    default:
      return chalk.green(status);
  }
};

const httpCodeColor = (code) => {
  return code >= 500
    ? chalk.red(code)
    : code >= 400
    ? chalk.yellow(code)
    : code >= 300
    ? chalk.cyan(code)
    : code >= 200
    ? chalk.green(code)
    : code;
};
