const axios = require("axios");
const createError = require("axios/lib/core/createError");
const _ = require("lodash");

/**
 * Create Axios client for jelastic api, will serialize params in
 * order to give required session params.
 */
const jelasticRequestFactory = (strapi, { jelasticHost, jelasticToken }) => {
  const axiosInstance = axios.create({
    baseURL: `${jelasticHost}/1.0`,
    headers: {
      Accept: "application/json",
    },
    timeout: 6000,
    params: {},
  });

  axiosInstance.interceptors.request.use(
    requestInterceptor(strapi, jelasticToken),
    function (error) {
      strapi.log.warn("jelastic-client error: " + JSON.stringify(error));
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    responseInterceptor(strapi),
    function (error) {
      strapi.log.warn("jelastic-client error: " + JSON.stringify(error));
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

module.exports = jelasticRequestFactory;

/**
 * add debug logs on request
 */
const requestInterceptor = (strapi, jelasticToken) => (config) => {
  _.set(
    config,
    "params.appid",
    config?.params?.appid || "1dd8d191d38fff45e62564fcf67fdcd6"
  );
  _.set(config, "params.session", jelasticToken);
  strapi.log.debug("jelastic-client call: " + JSON.stringify(config, null, 1));
  return config;
};

/**
 * Handle wired jelastic api that returns always status 200
 * when data.error from jelastic exists, raises an axios error.
 * Add warnings on error.
 */
const responseInterceptor = (strapi) => (response) => {
  const { status, data } = response;
  if (status >= 200 && status <= 300) {
    if (!!data.error) {
      strapi.log.warn(
        `jelastic-client response error: ${JSON.stringify(data.error)}`
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
    `jelastic-client response error: ${JSON.stringify(
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
