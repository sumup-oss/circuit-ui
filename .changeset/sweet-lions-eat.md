---
'@sumup/design-tokens': major
---

Removed all colors from the legacy JavaScript theme object and theme prop type. Use the semantic color tokens instead:

```diff
-color: ${theme.colors.p500};
+color: var(--cui-fg-accent);
```
