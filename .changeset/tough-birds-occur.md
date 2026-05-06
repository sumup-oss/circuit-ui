---
"@sumup-oss/circuit-ui": minor
"@sumup-oss/icons": minor
---

Added the flag of Catalonia. Load it using the `Flag` component or the `getIconURL()` helper:

```jsx
import { Flag } from '@sumup-oss/circuit-ui';
import { getIconURL } from '@sumup-oss/icons';

<Flag countryCode="ES-CT" />
<img src={getIconURL("flag_es-ct")} alt="Catalonia" />
```
