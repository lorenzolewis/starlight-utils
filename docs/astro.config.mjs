import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidatorPlugin from "starlight-links-validator";
import starlightUtils from "@lorenzo_lewis/starlight-utils";

// https://astro.build/config
export default defineConfig({
  site: "https://starlight-utils.pages.dev",
  integrations: [
    starlight({
      title: "🧰 Starlight Utils",
      social: {
        github: "https://github.com/lorenzolewis/starlight-utils",
      },
      sidebar: [
        {
          label: "Main",
          items: [
            { label: "Docs", autogenerate: { directory: "/docs" } },
            {
              label: "Utilities",
              autogenerate: { directory: "/utilities" },
            },
          ],
        },
        {
          label: "Demos",
          autogenerate: { directory: "/demos" },
        },
      ],
      components: {},
      plugins: [
        starlightLinksValidatorPlugin(),
        starlightUtils({ multiSidebar: true }),
      ],
    }),
  ],
});
