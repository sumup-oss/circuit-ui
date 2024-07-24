---
'@sumup/icons': major
---

Use default parameters for default props rather than statically assigning them as `defaultProps`. This silences React 18.3's warning about `defaultProps` being deprecated and enables tree shaking the icon components (which is prevented if they have static assignments).
