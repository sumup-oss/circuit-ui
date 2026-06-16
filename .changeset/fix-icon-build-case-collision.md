---
"@sumup-oss/icons": patch
---

Fixed a build script bug where two icon component names that differ only in case (`SumUpCard` from `sum_up_card` and `SumupCard` from `sumup_card`) would corrupt each other's generated `.js` file on macOS's case-insensitive filesystem (HFS+/APFS). The build script now detects case-insensitive filename collisions and combines the affected components into a single file, ensuring both exports are available and the generated output is always syntactically valid.
