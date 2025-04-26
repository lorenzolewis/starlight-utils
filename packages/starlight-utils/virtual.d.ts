declare module "virtual:starlight-utils/config" {
  const Config: import("./config").StarlightUtilsConfig;
  export default Config;
}

export interface StarlightUtilsConfig {
  navLinksMobileDisplay?: "none" | "flex";
}

declare namespace App {
  type StarlightLocals = import("@astrojs/starlight").StarlightLocals;
  // Define the `locals.t` object in the context of a plugin.
  interface Locals extends StarlightLocals {
    starlightUtils: {
      navLinks?: Array<StarlightLocals["sidebar"]>;
      multiSidebar?: Array<{
        isCurrentSidebar: boolean;
        sidebar: Array<StarlightLocals["sidebar"]>;
        label: StarlightLocals["sidebar"][number];
      }>;
      // Array<StarlightLocals["sidebar"]>;
    };
  }
}
