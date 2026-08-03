---
"@sumup-oss/circuit-ui": major
---

Updated the NotificationBanner, NotificationFullscreen and NotificationModal components to use the Illustration component from `@sumup-oss/illustrations` under the hood. 
This change makes the `sumup-oss/illustrations` package a peer dependency.

In your application, you will need to import illustration styles from `@sumup-oss/illustrations/styles/Illustration.module.css`:
```tsx
// /app/layout.tsx or /pages/_app.tsx for Next.js
import '@sumup-oss/illustrations/styles/Illustration.module.css';

```
More information can be found in the [documentation](https://circuit.sumup.com/?path=/docs/introduction-getting-started--docs#importing-the-styles).
