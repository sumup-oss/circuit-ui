---
'@sumup/circuit-ui': patch
---

Moved the Toggle's `explanation` outside the switch button's `label` and connected it to the switch button using `aria-describedby` to provide a better experience to screen reader users. This affects the component's markup and might be a breaking change in instances customizing the Toggle's styles.
