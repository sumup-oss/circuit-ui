---
"@sumup-oss/circuit-ui": major
---

Moved `@sumup-oss/illustrations` from `dependencies` to `peerDependencies`. To use illustrations in Circuit UI components, consumers must now explicitly install it in their application and import its styles:

```diff
+import '@sumup-oss/illustrations/styles.css';
```
  
