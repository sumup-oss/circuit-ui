---
"@sumup-oss/circuit-ui": patch
---

Fixed an issue in NotificationModal where passing a ReactNode to the body prop caused it to be incorrectly wrapped in a <p> element. The body prop of type ReactNode now renders as-is.
