---
'@sumup/circuit-ui': patch
---

Ensured that `aria-invalid` is always either `'true'` or undefined (defaults to 'false'). This prevents errors in implementations not using TypeScript.
