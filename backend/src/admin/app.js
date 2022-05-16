import React, { useState } from "react";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import { Link } from "@strapi/design-system/Link";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import { Stack } from "@strapi/design-system/Stack";
import { Flex } from "@strapi/design-system/Flex";
import { Divider } from "@strapi/design-system/Divider";

const infoAddOns = {
  "api::decidim.instance": ({ initialData }) => {
    if (!initialData?.subdomain) return null;
    return (
      <>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <Flex
          spacing={2}
          style={{ justifyContent: "space-between" }}
          horizontal
        >
          <Typography variant="omega" fontWeight="bold">
            URL
          </Typography>
          <Link
            variant="secondary"
            href={`https://${initialData.subdomain}.voca.city`}
            target="_blank"
          >
            {`${initialData.subdomain}.voca.city`}
          </Link>
        </Flex>
      </>
    );
  },
};

export default {
  config: {
    locales: ["en"],
  },
  bootstrap(app) {
    app.injectContentManagerComponent("editView", "informations", {
      name: "voca-infos",
      Component: () => {
        const { slug, initialData } = useCMEditViewDataManager();
        if (typeof infoAddOns[slug] === undefined) return null;
        const Comp = infoAddOns[slug];
        return <Comp initialData={initialData} />;
      },
    });
  },
};
