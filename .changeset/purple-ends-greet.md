---
"@sumup-oss/circuit-ui": patch
---

Moved the accessibility warning for missing props to the correct component. It's the TabPanel, not the TabList, that requires the `id` and `aria-labelledby` props.
  