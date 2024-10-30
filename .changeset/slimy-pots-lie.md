---
'@sumup-oss/eslint-plugin-circuit-ui': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/eslint-plugin-circuit-ui` with `@sumup-oss/eslint-plugin-circuit-ui` in your `package.json` file, then update the plugin and rule names in your ESLint config:

```diff
// .eslintrc.js

module.exports = {
-  plugins: ['@sumup/circuit-ui'],
+  plugins: ['@sumup-oss/circuit-ui'],
  rules: {
-    '@sumup/circuit-ui/component-lifecycle-imports': 'error',
+    '@sumup-oss/circuit-ui/component-lifecycle-imports': 'error',
  },
};
```
