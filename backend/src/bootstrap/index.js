const setPermissions = require("./set-permissions");
const jelasticClient = require("./jelastic-client");
const installLifecycles = require("./user-permission-lifecycles");

module.exports = [installLifecycles, setPermissions, jelasticClient];
