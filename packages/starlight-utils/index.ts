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
        const internalConfig = config;
        if (utilsConfig?.multiSidebar) {
          internalConfig.components ??= {};
          internalConfig.components.Sidebar =
            "@lorenzo_lewis/starlight-utils/components/Sidebar.astro";
        }

        updateConfig({ components: { ...internalConfig.components } });
      },
    },
  };
}

export default plugin;
