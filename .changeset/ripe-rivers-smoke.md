---
"@sumup-oss/icons": minor
---

Replaced multi-colored PaymentMethod and CardScheme icons with components. They were previously available as SVG icon components, but inlining their full-color SVG source made bundles heavy, so these components load the icon as an image instead. The Flag component was also moved here from `@sumup-oss/circuit-ui`. 
