---
"@sumup-oss/circuit-ui": major
---

Migrated the SideNavigation component's `badge` prop from the deprecated `Badge` component's props to the `Status` component's props. On primary links, `badge.variant` has been renamed to `badge.color`. On secondary links, `badge` is now typed as `StatusProps` instead of `BadgeProps`: replace `variant` with `color`, and replace `circle` with `variant="badge"`.

