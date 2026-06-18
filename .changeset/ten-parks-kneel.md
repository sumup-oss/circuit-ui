---
"@sumup-oss/circuit-ui": major
---

Changed the Toggle component implementation to use a native input element instead of a button element under the hood. `onChange` now fires a native `ChangeEvent<HTMLInputElement>` instead of `ClickEvent<HTMLButtonElement>`.
