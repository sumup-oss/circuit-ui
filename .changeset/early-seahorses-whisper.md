---
'@sumup/circuit-ui': major
---

Moved the SingleDayPicker, RangePicker, CalendarTag, and CalendarTagTwoStep components to the ["legacy" status](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs).

Install the optional peer dependencies...

```sh
npm add react-dates moment
```

...and update your imports:

```diff
-import { SingleDayPicker } from '@sumup/circuit-ui';
+import { SingleDayPicker } from '@sumup/circuit-ui/legacy';
```
