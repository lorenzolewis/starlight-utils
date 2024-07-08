import { AstroError } from "astro/errors";
import { z } from "astro/zod";

const multiSidebarConfig = z
  .union([
    z.object({
      switcherStyle: z.union([
        z.enum(["dropdown", "horizontalList", "hidden"]).default("horizontalList"),
        z.boolean(),
      ]),
    }),
    z.boolean().transform((value) => {
      if (value) {
        return { switcherStyle: "horizontalList" as const };
      } else {
        return undefined;
      }
    }),
  ])
  .optional();

const navLinksConfig = z
  .object({
    leading: z.object({ useSidebarLabelled: z.string() }).optional(),
  })
  .optional();

export const configSchema = z
  .object({
    multiSidebar: multiSidebarConfig,
    navLinks: navLinksConfig,
  })
  .optional();

export type StarlightUtilsConfig = z.infer<typeof configSchema>;

export function validateConfig(userConfig: unknown): StarlightUtilsConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();
    throw new AstroError(
      `Invalid starlight-utils configuration:

            ${errors.formErrors
              .map((formError) => ` - ${formError}`)
              .join("\n")}
            ${Object.entries(errors.fieldErrors)
              .map(
                ([fieldName, fieldErrors]) =>
                  `- ${fieldName}: ${JSON.stringify(fieldErrors)}`
              )
              .join("\n")}
            `
    );
  }

  return config.data;
}
