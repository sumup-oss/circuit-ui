---
"@sumup-oss/icons": minor
---

Added a collection of country flags (sourced from [flagicons.lipis.dev](https://flagicons.lipis.dev/)).

Flags are distributed as raw SVG files and are **not** exposed as React components. You can import them directly using the naming convention `flag_[country_code].svg`, where `country_code` is the ISO 3166-1 alpha-2 code in lowercase:

```tsx
import flagFr from '@sumup-oss/icons/flag_fr.svg';

const FrenchFlag = () => (
    <div>
        <img src={flagFr} alt="" />
        <span>The French flag</span>
    </div>
);
```

Alternatively, you can generate a flag URL with the `getIconURL` helper by omitting the size argument:

```tsx
import { getIconURL } from '@sumup-oss/icons';

const FrenchFlag = () => (
  <div>
      <img src={getIconURL('flag_fr')} alt="" />
      <span>The French flag</span>
  </div>
);
```
