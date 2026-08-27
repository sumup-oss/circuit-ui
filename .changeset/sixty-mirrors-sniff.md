---
"@sumup-oss/circuit-ui": major
---

Made the internationalization context required to configure the display language and formatting locale for all design system components. Wrap your application in the `I18nProvider`:

```tsx
// For example /app/layout.tsx for Next.js
import { I18nProvider } from "@sumup-oss/circuit-ui";

export default function App() {
  return (
    <I18nProvider locale="en-US" formattingLocale="de-DE">
      {/* children */}
    </I18nProvider>
  );
}
```
