---
title: Configuration
sidebar:
  order: 2
---

There are a few options that can be passed to `starlight-multi-sidebar`. See below for how to configure each of those options

```ts {11-13}
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightMultiSidebar from "@lorenzo_lewis/starlight-multi-sidebar";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightMultiSidebar({
          switcherStyle: "horizontalList",
        }),
      ],
    }),
  ],
});
```

## `switcherStyle`

**Type:** `"dropdown" | "horizontalList"`

**Default:** `"horizontalList"`

Specifies which style should be used for the sidebar.
