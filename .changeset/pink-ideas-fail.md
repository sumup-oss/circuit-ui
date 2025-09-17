---
"@sumup-oss/eslint-plugin-circuit-ui": major
---

Migrated to [ESLint's new flat config system](https://eslint.org/blog/2022/08/new-config-system-part-2/) and exported a new recommended config:

```js
// eslint.config.js
import { defineConfig, files } from "@sumup-oss/foundry/eslint";
import circuitUI from "@sumup-oss/eslint-plugin-circuit-ui";

export default defineConfig([
  {
    files: [...files.javascript, ...files.typescript],
    extends: [circuitUI.configs.recommended],
  },
]);
```
