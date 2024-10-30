---
'@sumup-oss/stylelint-plugin-circuit-ui': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/stylelint-plugin-circuit-ui` with `@sumup-oss/stylelint-plugin-circuit-ui` in your `package.json` file, then update the plugin name in your Stylelint config:

```diff
// .stylelintrc.js

module.exports = {
-  plugins: ['@sumup/stylelint-plugin-circuit-ui'],
+  plugins: ['@sumup-oss/stylelint-plugin-circuit-ui'],
};
```
