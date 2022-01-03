---
'@sumup/circuit-ui': patch
---

Improved types in the `CurrencyInput`. The component's type (exposed via its `ref`) changed from `NumberFormat` to `NumberFormat<InputProps>`, now explicitly typing the wrapped Circuit UI `Input`.
