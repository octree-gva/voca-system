const Yup = require("yup");
const accountCreationSchema = () =>
  Yup.object()
    .shape({
      password: Yup.string()
        .required("Password is required")
        .min(10)
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/,
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

module.exports = () => ({
  create: async (options) => {
    const createAccountSchema = accountCreationSchema();
    try {
      const validationResult = await createAccountSchema.validate(
        options || {}
      );
      const { email, password } = validationResult;
      return await strapi.plugins["users-permissions"].services.user.add({
        username: email,
        email: email,
        provider: "local",
        password: password,
        confirmed: true,
        blocked: false,
      });
    } catch (e) {
      throw e;
    }
    throw new Error("Server error");
  },
});
