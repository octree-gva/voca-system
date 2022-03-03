const { 
  STRAPI_URL="http://localhost",
  STRAPI_TOKEN="", 
  NEXTAUTH_SECRET="change-me", 
  NEXTAUTH_URL="http://localhost:3000"
} = process.env;

module.exports = {
  apps: [
    {
      name: "strapi",
      cwd: "api/",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      restart_delay: 10000,
      max_restarts: 10,
      env: {
        PORT: 80,
      },
    },
    {
      name: "next",
      cwd: "app/",
      script: "yarn",
      args: "start",
      interpreter: "bash",
      restart_delay: 10000,
      env: {
        PORT: 3000,
        STRAPI_URL,
        STRAPI_TOKEN,
        NEXT_STRAPI_TOKEN,
        NEXTAUTH_SECRET,
        NEXTAUTH_URL
      },
    },
  ],
};
