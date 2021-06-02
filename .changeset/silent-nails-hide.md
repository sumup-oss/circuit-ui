---
'@sumup/circuit-ui': major
---

Update the Table component's onSortBy method signature.

The signature of the Table's custom onSortBy method changed. The `nextDirection` argument moved to the third position (`(index, nextDirection, rows)` 👉 `(index, rows, nextDirection)`) and can now be `undefined` (instead of `null` in the previous implementation).
