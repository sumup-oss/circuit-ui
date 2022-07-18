---
'@sumup/circuit-ui': major
---

Migrated the Popover component from Popper to Floating UI. Popper `modifiers` are longer supported, use `offsetProp` prop for flexible placement of floating element instead. `placement` prop can no longer have `auto*` values. Fixed `ProfileMenu` to use the updated `Popover` API. 
