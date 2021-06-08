---
'@sumup/circuit-ui': major
---

Changed the signature of the Table's custom onSortBy method. The `nextDirection` argument moved to the third position (`(index, nextDirection, rows)` 👉 `(index, rows, nextDirection)`) and can now be `undefined` (instead of `null` in the previous implementation).
