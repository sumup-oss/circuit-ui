---
'@sumup/circuit-ui': major
---

Moved the Sidebar, SidebarContextProvider, SidebarContextConsumer, and Header components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Update your imports:

```diff
-import { Sidebar } from '@sumup/circuit-ui';
+import { Sidebar } from '@sumup/circuit-ui/legacy';
```
