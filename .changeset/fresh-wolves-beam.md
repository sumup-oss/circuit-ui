---
'@sumup/circuit-ui': patch
---

Switched the `ToastContext`'s live region element from a `ul` to a `div`: lists shouldn't have `role="status"` since this strips list semantics.
