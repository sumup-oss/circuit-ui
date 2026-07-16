---
"@sumup-oss/icons": minor
---

Added `PaymentMethod` and `CardScheme` components. They were previously available as individual SVG icon components, but inlining their full-color SVG source made bundles heavy, so these components load the icons as an image from a URL instead.
