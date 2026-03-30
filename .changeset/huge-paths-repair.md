---
"@sumup-oss/circuit-ui": patch
---

Fixed the type check for the ListItemGroup's `leadingComponent` prop when passing a component that is wrapped in `React.forwardRef` or `React.memo`.
