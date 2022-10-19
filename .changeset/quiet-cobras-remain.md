---
'@sumup/circuit-ui': major
---

Moved the `validationHint` outside the input `label`s and connected them to the inputs using `aria-describedby`. This affects form component markup and might be a breaking change in instances customizing input styles.
