---
"@sumup-oss/icons": minor
---

Marked icons from the "Country flag" category as deprecated. Use the Flag component from Circuit UI instead.

```diff
-import { FlagFr } from '@sumup-oss/icons';
+import { Flag } from '@sumup/circuit-ui';

function Example() {
  return (
    <>
-      {/* Deprecated icon usage */}
-      <FlagFr size="16" />

+      {/* Recommended usage with the Flag component */}
+      <Flag countryCode="FR"/>
    </>
  );
}

```
