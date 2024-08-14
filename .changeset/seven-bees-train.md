---
'@sumup-oss/circuit-ui': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/circuit-ui` with `@sumup-oss/circuit-ui` in your `package.json` file, then update all imports:

```diff
-import { Button } from '@sumup/circuit-ui';
+import { Button } from '@sumup-oss/circuit-ui';
```

[Circuit UI's ESLint plugin](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) offers the `renamed-package-scope` rule to automate updating the package imports.
