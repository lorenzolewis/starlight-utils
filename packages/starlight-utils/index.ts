import type { StarlightPlugin } from "@astrojs/starlight/types";
import { validateConfig, type StarlightUtilsConfig } from "./config";
import integration from "./integration";

function plugin(userConfig?: StarlightUtilsConfig): StarlightPlugin {
  const multiSidebarConfig = validateConfig(userConfig);
  return {
    name: "starlight-utils",
    hooks: {
      setup({ config, updateConfig, addIntegration }) {
        updateConfig({
          components: {
            ...config.components,
            Sidebar: "@lorenzo_lewis/starlight-utils/overrides/Sidebar.astro",
          },
        });
        addIntegration(integration(multiSidebarConfig));
      },
    },
  };
}

export default plugin;
