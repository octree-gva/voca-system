const { ApplicationError } = require("@strapi/utils").errors;

module.exports = ({ strapi }) => {
  const getManifests = async () => {
    const manifests = await strapi
      .query("api::jelastic-config.jelastic-manifest")
      .findOne();
    if (!manifests && process.env.NODE_ENV !== "test") {
      throw new ApplicationError("No manifests urls found");
    }
    return manifests;
  };
  const control = async (command, envName) => {
    if (!["start", "stop", "sleep"].includes(command)) {
      throw new ApplicationError("Command not allowed");
    }
    const manifests = await getManifests();

    return await strapi.jelasticClient.manifest.install(
      manifests?.controlJps,
      {
        envName: envName,
        nodeGroup: undefined,
        manifestSettings: {
          CONTROL: command,
        },
      },
      false
    );
  };
  return {
    start: async (instance) => control("start", instance.envName),
    stop: async (instance) => control("stop", instance.envName),
    sleep: async (instance) => control("sleep", instance.envName),
  };
};
