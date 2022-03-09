const axios = require("axios");
const createError = require("axios/lib/core/createError");
const _ = require("lodash");
const { JELASTIC_TOKEN, JELASTIC_HOST } = process.env;
/**
 * Axios client for jelastic api, will serialize params in
 * order to give required session params.
 */
const cli = axios.create({
  baseURL: `${JELASTIC_HOST}/1.0`,
  headers: {
    Accept: "application/json",
  },
  timeout: 6 * 1000,
  params: {},
});

const requestInterceptor = function (config) {
  _.set(
    config,
    "params.appid",
    config?.params?.appid || "1dd8d191d38fff45e62564fcf67fdcd6"
  );
  _.set(config, "params.session", JELASTIC_TOKEN);
  strapi.log.debug("jelastic-cli call: " + JSON.stringify(config, null, 1));
  return config;
};
/**
 * add debug logs on request
 */
cli.interceptors.request.use(requestInterceptor, function (error) {
  strapi.log.warn("jelastic-cli error: " + JSON.stringify(error));
  return Promise.reject(error);
});
const responseInterceptor = function (response) {
  const { status, data } = response;
  if (status >= 200 && status <= 300) {
    if (!!data.error) {
      strapi.log.warn(
        `jelastic-cli response error: ${JSON.stringify(data.error)}`
      );
      throw createError(
        process.env.NODE_ENV !== "production"
          ? `Jelastic API error: ${data.error}`
          : "",
        response.config,
        400,
        null,
        response
      );
    }
    return { data, error: null };
  }
  strapi.log.warn(
    `jelastic-cli response error: ${JSON.stringify(
      data?.error || `Error status ${status}`
    )}`
  );
  throw createError(
    JSON.stringify(data?.error || `Error status ${status}`),
    response.config,
    500,
    null,
    response
  );
};
/**
 * Handle wired jelastic api that returns always status 200
 * when data.error from jelastic exists, raises an axios error.
 * Add warnings on error.
 */
cli.interceptors.response.use(responseInterceptor, function (error) {
  strapi.log.warn("jelastic-cli error: " + JSON.stringify(error));
  return Promise.reject(error);
});

module.exports = { cli, responseInterceptor, requestInterceptor };
