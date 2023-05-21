---
'@sumup/circuit-ui': major
---

Changed the font-display of Aktiv Grotesk, Circuit UI's default font family, from `swap` to `optional`. If the font family is not available locally or cached, a fallback font is used. This reduces the cumulative layout shift (CLS) and largest contentful paint (LCP). The visual difference is minimal.
