---
'@sumup-oss/icons': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/icons` with `@sumup-oss/icons` in your `package.json` file, then update all imports:

```diff
-import { Search } from '@sumup/icons';
+import { Search } from '@sumup-oss/icons';
```

[Circuit UI's ESLint plugin](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) offers the `renamed-package-scope` rule to automate updating the package imports.
