const { createCoreService } = require("@strapi/strapi").factories;

const Yup = require("yup");
const accountCreationSchema = () =>
  Yup.object()
    .shape({
      password: Yup.string()
        .required("Password is required")
        .min(10)
        .matches(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})"
          ),
          "Must Contain 10 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      password_confirmation: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref("password")], "Passwords does not match"),
      email: Yup.string()
        .email()
        .required()
        .test(
          "uniq-email",
          "Email ${value} is already taken.",
          async (value) => {
            return !(await strapi
              .query("plugin::users-permissions.user")
              .findOne({ where: { email: value } }));
          }
        ),
    })
    .required("account param are required");

module.exports = createCoreService("api::account.account", ({ strapi }) => ({
  async create(options) {
    const createAccountSchema = accountCreationSchema();
    try {
      const validationResult = await createAccountSchema.validate(
        options || {}
      );
      const { email, password } = validationResult;
      const newUser = await strapi.plugins[
        "users-permissions"
      ].services.user.add({
        username: email,
        email: email,
        provider: "local",
        password: password,
        confirmed: true,
        blocked: false,
      });
      // Create and associate a new account
      const account = await super.create({
        data: {
          title: `Workspace`,
          creator: newUser,
          administrators: [newUser],
        },
      });
      return { ...account, creator: newUser, administrators: [newUser] };
    } catch (e) {
      throw e;
    }
    throw new Error("Server error");
  },
}));
