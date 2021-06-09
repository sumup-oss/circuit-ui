---
'@sumup/circuit-ui': major
---

For sortable `Table` columns (when headers have the `sortable` prop), the previously optional `sortLabel` prop is now enforced. This is an accessibility requirement. If a `sortLabel` is not provided, the column will not be sortable.
