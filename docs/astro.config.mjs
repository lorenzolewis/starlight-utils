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
      credits: true,
      social: {
        github: "https://github.com/lorenzolewis/starlight-utils",
      },
      editLink: {
        baseUrl:
          "https://github.com/lorenzolewis/starlight-utils/edit/main/docs/",
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
          badge: "New",
          autogenerate: { directory: "/demos" },
        },
        {
          label: "leading",
          items: [
            { label: "Docs", link: "/docs" },
            { label: "Demos", link: "/demos/1" },
          ],
        },
      ],
      components: {},
      plugins: [
        starlightLinksValidatorPlugin(),
        starlightUtils({
          multiSidebar: { switcherStyle: "horizontalList" },
          navLinks: {
            leading: { useSidebarLabelled: "leading" },
          },
        }),
      ],
    }),
  ],
});
