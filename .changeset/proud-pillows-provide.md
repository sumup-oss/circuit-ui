---
'@sumup-oss/circuit-ui': minor
---

Added default translations for labels that don't change with the usage of the component. Translations are included for all locales where SumUp operates, namely `bg-BG`, `cs-CZ`, `da-DK`, `de-AT`, `de-CH`, `de-DE`, `de-LU`, `el-CY`, `el-GR`, `en-AU`, `en-GB`, `en-IE`, `en-MT`, `en-US`, `es-CL`, `es-CO`, `es-ES`, `es-MX`, `es-PE`, `es-US`, `et-EE`, `fi-FI`, `fr-BE`, `fr-CH`, `fr-FR`, `fr-LU`, `hr-HR`, `hu-HU`, `it-CH`, `it-IT`, `lt-LT`, `lv-LV`, `nb-NO`, `nl-BE`, `nl-NL`, `pl-PL`, `pt-BR`, `pt-PT`, `ro-RO`, `sk-SK`, `sl-SI`, and `sv-SE`. The current locale is determined based on the `locale` prop or the `navigator.language` API in environments that support it. If no supported locale is found, `en-US` is used as a fallback.

The following component props are now optional:

- Button, IconButton: `loadingLabel`
- Calendar: `prevMonthButtonLabel`, `nextMonthButtonLabel`
- DateInput: `yearInputLabel`, `monthInputLabel`, `dayInputLabel`, `openCalendarButtonLabel`, `closeCalendarButtonLabel`, `applyDateButtonLabel`, `clearDateButtonLabel`
- ImageInput: `clearButtonLabel`, `loadingLabel`
- Toggletip: `closeButtonLabel`

We'll add default translations to more components in the future.
