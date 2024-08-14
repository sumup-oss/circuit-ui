---
'@sumup-oss/design-tokens': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/design-tokens` with `@sumup-oss/design-tokens` in your `package.json` file, then update all imports:

```diff
-import '@sumup/design-tokens/light.css';
+import '@sumup-oss/design-tokens/light.css';
```

[Circuit UI's ESLint plugin](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs) offers the `renamed-package-scope` rule to automate updating the package imports.
