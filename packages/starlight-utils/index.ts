import type { StarlightPlugin } from "@astrojs/starlight/types";
import { validateConfig, type StarlightUtilsConfig } from "./config";
import integration from "./integration";

function plugin(userConfig?: StarlightUtilsConfig): StarlightPlugin {
  const utilsConfig = validateConfig(userConfig);
  return {
    name: "starlight-utils",
    hooks: {
      setup({ addIntegration, config, updateConfig, addRouteMiddleware }) {
        addIntegration(integration(utilsConfig));
        const componentOverrides: typeof config.components = {};
        if (utilsConfig?.multiSidebar) {
          componentOverrides.Sidebar =
            "@lorenzo_lewis/starlight-utils/components/Sidebar.astro";
        }
        if (utilsConfig?.navLinks?.leading) {
          componentOverrides.SiteTitle =
            "@lorenzo_lewis/starlight-utils/components/SiteTitle.astro";
        }
        updateConfig({
          components: {
            ...componentOverrides,
            ...config.components,
          },
        });
        addRouteMiddleware({
          entrypoint: "@lorenzo_lewis/starlight-utils/middleware",
        });
      },
    },
  };
}

export default plugin;
