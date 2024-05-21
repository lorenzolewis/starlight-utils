import { AstroError } from "astro/errors";
import { z } from "astro/zod";

const multiSidebarConfig = z
  .union([
    z.object({ switcherStyle: z.enum(["dropdown", "horizontalList"]) }),
    z.boolean(),
  ])
  .optional();

export const configSchema = z
  .object({
    multiSidebar: multiSidebarConfig,
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
