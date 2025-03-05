declare module "virtual:starlight-utils/config" {
  const Config: import("./config").StarlightUtilsConfig;
  export default Config;
}

declare namespace App {
  type StarlightLocals = import("@astrojs/starlight").StarlightLocals;
  // Define the `locals.t` object in the context of a plugin.
  interface Locals extends StarlightLocals {}
}
