---
'@sumup/circuit-ui': major
---

Moved the SingleDayPicker, RangePicker, CalendarTag, and CalendarTagTwoStep components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs).

Install the optional peer dependencies...

```bash
npm install react-dates@^21.8 moment@^2.29
```

...and update your imports:

```diff
-import { SingleDayPicker } from '@sumup/circuit-ui';
+import { SingleDayPicker } from '@sumup/circuit-ui/legacy';
```
