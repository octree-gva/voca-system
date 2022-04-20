module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "mail.gandi.net"),
        port: env("SMTP_PORT", 587),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_DEFAULT_FROM"),
        defaultReplyTo: env("SMTP_DEFAULT_REPLYTO"),
      },
    },
  },
  "email-designer": {
    enabled: true,
    // ⬇︎ Add the config property
    config: {
      editor: {
        // optional - if you have a premium unlayer account

        tools: {
          heading: {
            properties: {
              text: {
                value: "This is the new default text!",
              },
            },
          },
        },
        options: {
          features: {
            colorPicker: {
              presets: [
                "#192538",
                "#253550",
                "#505d73",
                "#1c4741",
                "#28665D",
                "#53847d",
                "#934400",
                "#D26200",
                "#db8133",
                "#938300",
                "#D2BC00",
                "#dbc933",
                "#ffffff",
                "#ffffff",
              ],
            },
          },
          fonts: {
            showDefaultFonts: false,
            /*
             * If you want use a custom font you need a premium unlayer account and pass a projectId number :-(
             */
            customFonts: [
              {
                label: "Inter",
                value: "'Inter', sans-serif",
                url: "https://fonts.googleapis.com/css?family=Inter",
              },
            ],
          },
          mergeTags: [
            {
              name: "Email",
              value: "{{= USER.username }}",
              sample: "john@doe.com",
            },
            // ...
          ],
        },
        appearance: {
          theme: "dark",
          panels: {
            tools: {
              dock: "left",
            },
          },
        },
      },
    },
  },
});
