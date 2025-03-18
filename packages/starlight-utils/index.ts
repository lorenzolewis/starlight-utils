import type { StarlightPlugin } from "@astrojs/starlight/types";
import { validateConfig, type StarlightUtilsConfig } from "./config";
import integration from "./integration";

function plugin(userConfig?: StarlightUtilsConfig): StarlightPlugin {
  const utilsConfig = validateConfig(userConfig);
  return {
    name: "starlight-utils",
    hooks: {
      setup({
        addIntegration,
        config,
        updateConfig,
        addRouteMiddleware,
        logger,
      }) {
        addIntegration(integration(utilsConfig));
        const componentOverrides: typeof config.components = {};
        if (utilsConfig?.multiSidebar) {
          const indexStarlightAutoSidebar = config.plugins?.findIndex(
            ({ name }) => name === "starlight-auto-sidebar"
          );
          const indexStarlightUtils = config.plugins?.findIndex(
            ({ name }) => name === "starlight-utils"
          );
          if (
            indexStarlightAutoSidebar &&
            indexStarlightUtils &&
            // Plugin exists
            indexStarlightAutoSidebar !== -1 &&
            // Plugin is placed after starlight utils
            indexStarlightAutoSidebar! > indexStarlightUtils
          ) {
            logger.warn(
              "Move `starlight-auto-sidebar` before `starlight-utils` in the Starlight `plugins` object of the Astro config if you wish to use the plugins together."
            );
          }
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
          order: "post",
        });
      },
    },
  };
}

export default plugin;
