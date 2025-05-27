---
'@sumup-oss/circuit-ui': minor
---

Removed special handling for the `onBlur` prop in the CheckboxGroup, RadioButtonGroup and SelectorGroup components. We consider this an implementation detail, however, you might need to update your types from `FocusEventHandler<HTMLInputElement>` to `FocusEventHandler<HTMLFieldsetElement>`.
