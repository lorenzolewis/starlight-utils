# @lorenzo_lewis/starlight-multi-sidebar

## 0.1.3

### Patch Changes

- 668249b: Refactor horizontal tab styles.

  If you are familiar with Astro docs prior to the Starlight migration this may look familiar 😉

## 0.1.2

### Patch Changes

- 74f3aec: Fix sidebar dropdown on Chromium browsers

## 0.1.1

### Patch Changes

- fbf8170: Improve a11y and pass through any Starlight `attrs` sidebar attributes.

  ⚠️ Potentially Breaking Change

  This refactors the underlying `<HorizontalList>` component and could result in some breaking changes if specifically targeting any of those attributes.

  In the future it _may_ be possible to theme the respective components via exposed APIs that will follow semver.

## 0.1.0

### Minor Changes

- ba9ba58: ⚠️ Breaking change

  The `starlight-multi-sidebar` config will need to be updated to call the function that is now returned:

  ```diff
  export default defineConfig({
    integrations: [
      starlight({
        title: "🗄️ Starlight Multi-Sidebar",
  +     plugins: [starlightMultiSidebar()],
  -     plugins: [starlightMultiSidebar],
      }),
    ],
  });
  ```

  A new dropdown style selector is now available. This can be useful for when the content of a sidebar is too wide to fit comfortably on one line. To use it specify the `switcherStyle: "dropdown"` option in the `starlight-multi-sidebar` config:

  ```ts
  export default defineConfig({
    integrations: [
      starlight({
        title: "🗄️ Starlight Multi-Sidebar",
        plugins: [
          starlightMultiSidebar({
            switcherStyle: "dropdown",
          }),
        ],
      }),
    ],
  });
  ```

## 0.0.4

### Patch Changes

- 40469c7: Update metadata

## 0.0.3

### Patch Changes

- 4b8fa2d: Update meta information

## 0.0.2

### Patch Changes

- 0b6b6c3: Add changeset and fix package name
- 3257e97: Update readme
- be44e2e: Create plugin
- 68c72e7: add scope
