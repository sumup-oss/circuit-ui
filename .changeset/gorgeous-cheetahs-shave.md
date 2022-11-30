---
'@sumup/circuit-ui': major
---

Removed the `Label` component from the public exports. Use the `label` prop on the form components instead. When building a custom form component, use a `label` element with the `typography('two')` style mixin (don't forget about the `for` prop).
