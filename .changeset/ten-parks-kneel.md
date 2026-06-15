---
"@sumup-oss/circuit-ui": major
---

Repalaced the `<button role="switch">` implementation with `<input type="checkbox" role="switch">`  in the Toggle component, `onChange` now fires a native `ChangeEvent<HTMLInputElement>` instead of `ClickEvent<HTMLButtonElement>`.
