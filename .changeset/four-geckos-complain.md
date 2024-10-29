---
'@sumup-oss/circuit-ui': major
---

Changed the `PlainDateRange` type from a tuple to an object with `start` and `end` properties. This affects the Calendar component's `selection` prop. Use the new `updatePlainDateRange` helper function to update a date range when a user selects a date.
