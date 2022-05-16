const { ValidationError } = require("@strapi/utils").errors;
const slugify = require("slugify");
const { v4: uuid } = require("uuid");

const defaultAcronym = (title) =>
  slugify(title, { replacement: "_", strict: true })
    .split("_")
    .filter((chunk) => chunk.length > 3)
    .map((chunk) => chunk.substring(0, 4))
    .slice(0, 3)
    .join("_")
    .toUpperCase();

module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    const {
      data: { account = null, acronym, title, creator },
    } = params;

    if (!account) {
      throw new ValidationError("Account is required");
    }
    if (!creator) {
      throw new ValidationError("Creator is required");
    }
    const instanceUUID = uuid();
    params.data.instanceUUID = instanceUUID;
    params.data.envName = instanceUUID.replace(/-/g, "").substring(0, 24);
    if (!acronym) {
      // Default acronym
      params.data.acronym = defaultAcronym(title);
    }
  },
  async afterUpdate(event) {
    const { result: instance } = event;
    const controlService = strapi.service("api::decidim.control");
    // Control the environment.
    switch (instance.status) {
      case "stopped":
        await controlService.stop(instance);
        break;
      case "started":
        await controlService.start(instance);
        break;
    }
  },
  async afterCreate(event) {
    const { result: instanceCreated } = event;
    const instancePopulated = await strapi.entityService.findOne(
      "api::decidim.instance",
      instanceCreated.id,
      { populate: ["creator", "account"] }
    );
    const { account } = instancePopulated;
    if (!account) throw new ValidationError("Account not found for instance.");
    // Deploy the instance in the account
    try {
      await strapi
        .service("api::decidim.deployment")
        .deployNew(instancePopulated);
    } catch (err) {
      // pass, request will <timeout> </timeout>
    }
    return instanceCreated;
  },
  async beforeUpdate(event) {
    delete event.params.data.account;
  },
};
