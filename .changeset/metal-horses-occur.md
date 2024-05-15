---
"@sumup/circuit-ui": minor
---

Added support for the SidePanel's `onClose` prop to be asynchronous. The SidePanel is closed after the `onClose` callback resolves and is prevented from closing if the callback rejects.
