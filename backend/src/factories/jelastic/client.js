const axios = require("axios");
const qs = require("qs");

const jelasticClientFactory = (jelasticRequest) => {
  // TODO : Use getEnvInfo endpoint instead of getEnvs
  const pickByName = async (envName, attribute, defaultValue = null) => {
    const {
      data: { infos = [] },
    } = await jelasticRequest.get("/environment/control/rest/getenvs");

    const envMatch = infos.filter(({ env }) => env.envName === envName);

    if (envMatch.length !== 1)
      return {
        data: null,
        error: { message: "Not Found", status: 404 },
      };
    return {
      data: attribute
        ? _.get(envMatch[0], attribute, defaultValue)
        : envMatch[0] || defaultValue,
      error: null,
    };
  };

  return {
    raw: jelasticRequest,
    environment: {
      pickByName,
      getOne: pickByName,

      getAll: () =>
        jelasticRequest.get("/environment/control/rest/getenvs", {
          params: { lazy: true },
        }),

      getAllApps: async (envName) => {
        const { data: appid } = await pickByName(envName, "env.appid", null);
        if (!appid) return { data: null, error: "Not found", status: 404 };

        return jelasticRequest.get(`/marketplace/app/rest/getappinfo`, {
          params: { appid, id: "vocacity-decidim-v0.0.1" },
        });
      },

      getAllNodes: async (envName) => pickByName(envName, "nodes", []),

      stop: (envName, appid) =>
        jelasticRequest.post(`/environment/control/rest/stopenv`, {
          params: { envName, appid },
        }),

      start: (envName, appid) =>
        jelasticRequest.post(`/environment/control/rest/startenv`, {
          params: { envName, appid },
        }),
    },
    manifest: {
      install: (
        manifest,
        { envName, displayName, nodeGroup = "vocacity", manifestSettings = {} },
        skipEmails = false
      ) => {
        try {
          jelasticRequest.post("/marketplace/jps/rest/install", "", {
            params: {
              envName,
              jps: manifest,
              displayName,
              nodeGroup,
              settings: JSON.stringify(manifestSettings),
              skipNodeEmails: !!skipEmails,
            },
            timeout: 1200, // don't wait the installation, 1200ms is enough to make the command
          });
        } catch (e) {
          if (!axios.isAxiosError(e)) throw e;
        }
      },
    },
  };
};

module.exports = jelasticClientFactory;
