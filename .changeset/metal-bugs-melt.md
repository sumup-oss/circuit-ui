---
'@sumup/circuit-ui': major
---

Moved the Tooltip component to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

```diff
-import { Tooltip } from '@sumup/circuit-ui';
+import { Tooltip } from '@sumup/circuit-ui/legacy';
```
