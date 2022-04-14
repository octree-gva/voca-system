const { ValidationError } = require("@strapi/utils").errors;
module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    const {
      data: { account = null },
    } = params;
    if (!account) throw new ValidationError("Account is required");
  },
  async beforeUpdate(event) {
    delete event.params.data.account;
  },
};
