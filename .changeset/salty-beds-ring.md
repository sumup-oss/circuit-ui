---
"@sumup-oss/circuit-ui": minor
---

Relax the requirement for the I18nProvider when the locale is passed directly as a prop. Wrapping your app in the I18nProvider remains the recommended way to set the locale and reduce boilerplate. Astro components, however, don't support React context, so passing the locale as a prop is easier in this case.
