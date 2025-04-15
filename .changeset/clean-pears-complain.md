---
"@sumup-oss/circuit-ui": patch
---

Removed legacy z-index value from the SidePanel component styles. The SidePanel now inherits this property from the Dialog component on desktop, and renders as a modal dialog in the top layer on mobile.
