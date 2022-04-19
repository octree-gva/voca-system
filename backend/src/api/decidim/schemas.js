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

const ALLOWED_LOCALES = [
  "ar",
  "bg",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "eo",
  "en",
  "es-ES",
  "es-MX",
  "es-PY",
  "et",
  "eu",
  "fi",
  "fr",
  "fr-CA",
  "ga",
  "gl",
  "hr",
  "hu",
  "id-ID",
  "is-IS",
  "it",
  "ja",
  "ko",
  "lb",
  "lt",
  "lv",
  "mt",
  "nl",
  "no",
  "pl",
  "pt-PT",
  "pt-BR",
  "ro-RO",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv-SE",
  "tr-TR",
  "uk",
  "vi",
  "zh-CN",
  "zh-TW",
];
const createEnvSchema = Yup.object().shape({
  subdomain: subdomainSchema,
  title: Yup.string().required("title is required"),
  acronym: Yup.string().nullable(),
  instanceUUID: Yup.string().required("instanceUUID is required"),
  currency: Yup.string().required("currency is required").min(1),
  timezone: Yup.string().required("timezone is required").min(3),
  default_locale: Yup.string()
    .required("default_locale is required")
    .oneOf(ALLOWED_LOCALES, "locale not allowed"),
  available_locales: Yup.string()
    .nullable()
    .test(
      "valid-locales",
      "Locales ${value} contains invalid locale.",
      async (value) => {
        if (!value) return true;
        const locales = `${value}`.split(",").map((s) => s.trim());
        return !locales.some((l) => !ALLOWED_LOCALES.includes(l));
      }
    ),
  current_user: Yup.object()
    .required("can not create anonymous instance.")
    .shape({
      username: Yup.string().required("username is required"),
      blocked: Yup.bool().nullable().isFalse("you are blocked"),
    }),
});

module.exports = { subdomainSchema, createEnvSchema };
