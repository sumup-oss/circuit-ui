---
"@sumup-oss/circuit-ui": major
---

Replaced the PhoneNumberInput country code native `<select>` with a searchable AutocompleteInput combobox. Country options show flag icons and can be filtered by name or ISO code.

Added `countryCode.options[].label` and `countryCode.getOptionLabel` for pre-computed, SSR-safe option labels. Added `prefixValue` support to ComboboxInput for prefix rendering in autocomplete triggers.
