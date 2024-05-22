import type { StarlightPlugin } from "@astrojs/starlight/types";
import { validateConfig, type StarlightUtilsConfig } from "./config";
import integration from "./integration";

function plugin(userConfig?: StarlightUtilsConfig): StarlightPlugin {
  const utilsConfig = validateConfig(userConfig);
  return {
    name: "starlight-utils",
    hooks: {
      setup({ addIntegration, config, updateConfig }) {
        addIntegration(integration(utilsConfig));
        if (utilsConfig?.multiSidebar) {
          updateConfig({
            components: {
              Sidebar:
                "@lorenzo_lewis/starlight-utils/components/Sidebar.astro",
              ...config.components,
            },
          });
        }
      },
    },
  };
}

export default plugin;
