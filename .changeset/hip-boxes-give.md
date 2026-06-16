---
"@sumup-oss/icons": patch
---

Fixed a broken case-insensitive filename collision on icons package `v6.10.0` (`SumupCard.js` vs `SumUpCard.js`) that caused the build to produce only one of the two files, resulting in "Module not found: Can't resolve './SumUpCard.js'" for consumers. Both `SumUpCard` and `SumupCard` can be imported safely.
