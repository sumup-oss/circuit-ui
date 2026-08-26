---
"@sumup-oss/circuit-ui": minor
---

Replaced the `title` attribute in IconButton with a [Tooltip](https://circuit.sumup.com/?path=/docs/components-tooltip--docs) to display its accessible name, since `title` is not accessible. IconButton's accessible name now comes from `aria-labelledby` instead of `aria-label`/`title`.
