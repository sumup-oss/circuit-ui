---
'@sumup/circuit-ui': patch
---

Removed the semantics from the Hr component by default since its most commonly used for purely visual or aesthetic purposes. If the horizontal rule is useful or essential to understanding the structure of the content, pass the `aria-hidden="false"` attribute to restore its semantics.
