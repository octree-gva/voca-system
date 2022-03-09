"use strict";
const _ = require("lodash");
const { cli } = require("../jelastic-cli");
const qs = require("qs");
const axios = require("axios");
/**
 * jelastic client.
 *
 * - raw: the axios client for making custom queries (should not use)
 * - environment: queries environment related endpoints
 */
const api = {
  raw: cli,
  environment: {
    pickByName: async (envName, attribute, defaultValue = null) => {
      const {
        data: { infos = [] },
      } = await cli.get("/environment/control/rest/getenvs");
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
    },
    getAll: () =>
      cli.get("/environment/control/rest/getenvs", {
        params: { lazy: true },
      }),
    getOne: async (envName) => api.environment.pickByName(envName),
    getAllApps: async (envName) => {
      const { data: appid } = await api.environment.pickByName(
        envName,
        "env.appid",
        null
      );
      if (!appid) {
        console.log("Not found================================");
        return { data: null, error: "Not found", status: 404 };
      }
      console.log("FOUND", { appid });
      return cli.get(`/marketplace/app/rest/getappinfo`, {
        params: { appid, id: "vocacity-decidim-v0.0.1" },
      });
    },
    getAllNodes: (envName) => api.environment.pickByName(envName, "nodes", []),
    stop: (envName, appid) =>
      cli.post(`/environment/control/rest/stopenv`, {
        params: { envName, appid },
      }),
    start: (envName, appid) =>
      cli.post(`/environment/control/rest/startenv`, {
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
        cli.post(
          "/marketplace/jps/rest/install",
          qs.stringify({ jps: JSON.stringify(manifest) }),
          {
            params: {
              envName,
              displayName,
              nodeGroup,
              settings: JSON.stringify(manifestSettings),
              skipNodeEmails: !!skipEmails,
            },
            timeout: 1200, // don't wait the installation, 1200ms is enough to make the command
          }
        );
      } catch (e) {
        if (!axios.isAxiosError(e)) throw e;
      }
    },
  },
};
module.exports = api;
