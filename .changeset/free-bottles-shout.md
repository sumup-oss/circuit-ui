---
"@sumup-oss/illustrations": major
---

Added a new illustration library. Import the Illustration component or use the `getIllustrationUrl` helper to start using illustrations. Find the detailed [documentation](https://github.com/sumup-oss/circuit-ui/blob/main/packages/illustrations/README.md) here.

```tsx
import { Illustration, getIllustrationUrl } from '@sumup-oss/illustrations';

function MyComponent() {
  return (<div>
    <Illustration name="celebration" />;
    <img src={getIllustrationUrl('celebration','light')} alt="" />
  </div>)
}

```
