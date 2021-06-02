---
'@sumup/circuit-ui': major
---

The `TableHeader`, `TableRow` and `TableCell` components are no longer exported from Circuit.

These components are only used internally by the Table component and should not be imported directly.

Relevant Table TypeScript types (`TableProps`, `TableSortDirection` `TableCell`, `TableRow`) are newly exported.
