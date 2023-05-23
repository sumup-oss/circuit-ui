---
'@sumup/circuit-ui': major
---

Moved the `uniqueId` util to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

```diff
-import { uniqueId } from '@sumup/circuit-ui';
+import { uniqueId } from '@sumup/circuit-ui/legacy';
```
