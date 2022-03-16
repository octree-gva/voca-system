module.exports = ({ nexus, strapi }) => ({
  types: [
    nexus.objectType({
      name: "EnvironmentPayload",
      definition(t) {
        t.field("data", { type: "Environment" });
        t.list.string("error");
      },
    }),
    nexus.objectType({
      name: "Environment",
      definition(t) {
        t.field("attributes", { type: "EnvironmentAttributes" });
        t.list.string("envGroups");
        t.list.field("nodeGroups", { type: "NodeGroup" });
        t.list.field("nodes", { type: "Node" });
        t.list.string("nodesData");
        t.list.string("nodesInternalDomains");
        t.int("result");
        t.string("right");
      },
    }),
    nexus.objectType({
      name: "EnvironmentAttributes",
      definition(t) {
        t.string("appid");
        t.list.string("contexts");
        t.string("createdOn");
        t.int("creatorUid");
        t.string("displayName");
        t.string("domain");
        t.string("envName");
        t.list.string("extdomains");
        t.string("hardwareNodeGroup");
        t.field("hostGroup", { type: "HostGroup" });
        t.boolean("isFirewallEnabled");
        t.boolean("isTransferring");
        t.boolean("ishaenabled");
        t.string("shortdomain");
        t.boolean("sslstate");
        t.int("status");
        t.int("uid");
      },
    }),
    nexus.objectType({
      name: "NodeGroup",
      definition(t) {
        t.list.string("deployments");
        t.list.string("features");
        t.boolean("isSLBAccessEnabled");
        t.boolean("isSequentialDeploy");
        t.string("name");
        t.int("redeployContainerDelay");
        t.int("redeployContextDelay");
        t.int("restartContainerDelay");
        t.int("restartNodeDelay");
        t.string("scalingMode");
        t.string("templateType");
        t.string("vType");
      },
    }),
    nexus.objectType({
      name: "Node",
      definition(t) {
        t.list.string("addons");
        t.string("address");
        t.string("adminUrl");
        t.int("bandwidthLimit");
        t.boolean("canBeExported");
        t.string("contextValidatorRegex");
        t.int("ctid");
        t.field("customitem", { type: "NodeCustomItem" });
        t.int("diskIoLimit");
        t.int("diskIopsLimit");
        t.int("diskLimit");
        t.list.string("endpoints");
        t.list.string("features");
        t.int("fixedCloudlets");
        t.int("flexibleCloudlets");
        t.string("guestOSType");
        t.boolean("hasPackages");
        t.string("hostOSType");
        t.int("id");
        t.string("intIP");
        t.boolean("isClusterSupport");
        t.boolean("isCustomSslSupport");
        t.boolean("isExternalIpRequired");
        t.boolean("isHighAvailability");
        t.boolean("isResetPassword");
        t.boolean("isVcsSupport");
        t.boolean("isWebAccess");
        t.boolean("ismaster");
        t.int("maxchanks");
        t.list.string("messages");
        t.string("name");
        t.string("nodeGroup");
        t.string("nodeType");
        t.string("nodemission");
        t.string("osType");
        t.list.string("packages");
        t.int("port");
        t.boolean("singleContext");
        t.int("status");
        t.string("type");
        t.string("url");
        t.string("user");
        t.string("vType");
        t.string("version");
      },
    }),
    nexus.objectType({
      name: "HostGroup",
      definition(t) {
        t.string("displayName");
        t.string("uniqueName");
      },
    }),
    nexus.objectType({
      name: "NodeCustomItem",
      definition(t) {
        t.field("dockerManifest", { type: "DockerManifest" });
        t.string("dockerName");
        t.string("dockerOs");
        t.string("dockerTag");
        t.list.string("dockerVolumes");
        t.list.string("dockerVolumesFrom");
        t.string("nodeVersion");
      },
    }),
    nexus.objectType({
      name: "DockerManifest",
      definition(t) {
        t.list.string("cmd");
        t.string("created");
        t.list.string("entrypoint");
        t.list.string("env");
        t.string("id");
        t.string("imageId");
        t.string("os");
        t.list.string("volumes");
        t.string("workdir");
      },
    }),
  ],
});
