---
'@sumup/design-tokens': minor
---

Changed the order of the default font stack to prefer web safe fonts over system fonts. This provides a more consistent user experience across platforms, reduces layout shift when switching to SumUp's brand font, Aktiv Grotesk, and works around a (supposedly fixed) [Chrome bug](https://www.bram.us/2020/04/24/chrome-vs-blinkmacsystemfont-a-workaround/).
