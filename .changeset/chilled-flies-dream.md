---
'@sumup/circuit-ui': major
---

Moved the Grid, Row, Col, and InlineElements components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

```diff
-import { Grid } from '@sumup/circuit-ui';
+import { Grid } from '@sumup/circuit-ui/legacy';
```
