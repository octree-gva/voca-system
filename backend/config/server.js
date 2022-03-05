module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", `${env("HOST", "0.0.0.0")}:${env.int("PORT", 1337)}`),
});
