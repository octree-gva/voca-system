const { ValidationError } = require("@strapi/utils").errors;
const slugify = require("slugify");
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
      data: { account = null, acronym, title },
    } = params;
    if (!account) throw new ValidationError("Account is required");
    if (!acronym) {
      // Default acronym
      params.data.acronym = defaultAcronym(title);
    }
  },
  async beforeUpdate(event) {
    delete event.params.data.account;
  },
};
