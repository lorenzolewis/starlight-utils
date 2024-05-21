import { AstroError } from "astro/errors";
import { z } from "astro/zod";

export const configSchema = z
  .object({ switcherStyle: z.enum(["dropdown", "horizontalList"]) })
  .optional()
  .default({ switcherStyle: "horizontalList" });

export function validateConfig(
  userConfig: unknown,
): StarlightMultiSidebarConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();
    throw new AstroError(
      `Invalid starlight-multi-sidebar configuration:

            ${errors.formErrors
              .map((formError) => ` - ${formError}`)
              .join("\n")}
            ${Object.entries(errors.fieldErrors)
              .map(
                ([fieldName, fieldErrors]) =>
                  `- ${fieldName}: ${JSON.stringify(fieldErrors)}`,
              )
              .join("\n")}
            `,
    );
  }

  return config.data;
}

export type StarlightMultiSidebarConfig = z.infer<typeof configSchema>;
