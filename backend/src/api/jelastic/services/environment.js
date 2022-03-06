"use strict";
const Yup = require("yup");

const createEnvSchema = Yup.object().shape({
  subdomain: Yup.string()
    .required("Subdomain is required")
    .matches(
      /^[a-z0-9\-\.\_]+[a-z0-9]+$/,
      "Subdomain is invalid. Uses lowercases"
    )
    .test(
      "punycode",
      "Punycodes are not yet supported",
      (value) => !`${value}`.startsWith("xn--")
    ),
  current_user: Yup.object()
    .required("can not create anonymous instance.")
    .shape({
      username: Yup.string().required("username is required"),
      blocked: Yup.bool().nullable().isFalse("you are blocked"),
    }),
});

module.exports = () => ({
  create: async (options) => {
    await createEnvSchema.validate(options || {});

    return { ok: true };
  },
});
