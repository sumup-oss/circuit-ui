---
'@sumup-oss/circuit-ui': patch
---

Added a `passwordManagerIgnore` prop to `Input`. `passwordManagerIgnore` prevents password overlays on the `Input` component in case it might be incorrectly considered a login input. Use-cases include inputs one-time-codes delivered via a side-channel (such as SMS or email).
