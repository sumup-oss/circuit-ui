---
"@sumup-oss/circuit-ui": major
---

Removed the `menu` ARIA role from the `ActionMenu` component. The `role="menu"` pattern triggers screen reader "Application mode" which requires non-standard keystrokes that most users are unaware of.
