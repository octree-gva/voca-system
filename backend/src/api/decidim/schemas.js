const Yup = require("yup");

const subdomainSchema = Yup.string()
  .required("Subdomain is required")
  .matches(
    /^[a-z0-9\-\.\_]+[a-z0-9]+$/,
    "Subdomain is invalid. Uses lowercases"
  )
  .test(
    "punycode",
    "Punycodes are not yet supported",
    (value) => !`${value}`.startsWith("xn--")
  );

const createEnvSchema = Yup.object().shape({
  subdomain: subdomainSchema,
  title: Yup.string().required("title is required"),
  acronym: Yup.string().required("acronym is required"),
  instanceUUID: Yup.string().required("instanceUUID is required"),
  current_user: Yup.object()
    .required("can not create anonymous instance.")
    .shape({
      username: Yup.string().required("username is required"),
      blocked: Yup.bool().nullable().isFalse("you are blocked"),
    }),
});

module.exports = { subdomainSchema, createEnvSchema };
