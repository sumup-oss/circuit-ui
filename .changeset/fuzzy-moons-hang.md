---
"@sumup-oss/circuit-ui": patch
---

Fixed showing the NotificationToast component on top of `dialog`-based components such as the Modal, SidePanel, and Popover by rendering toasts in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer) in browsers that support it.
