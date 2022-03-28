module.exports = ({ nexus }) => {
  return {
    types: [
      nexus.extendType({
        type: "UsersPermissionsMe",
        definition(t) {
          t.string("lastName");
          t.string("firstName");
        },
      }),
    ],
  };
};
