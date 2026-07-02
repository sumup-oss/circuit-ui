---
"@sumup-oss/circuit-ui": patch
---

**AutocompleteInput:** emit `onSearch` when the search text is reset internally (on
blur-restore, clear, and immersive modal dismiss), so consumers that derive `options`
from `onSearch` no longer show a stale, previously-filtered list after the field is
dismissed without a selection.

**AutocompleteInput:** close the results list when focus leaves the field (e.g. via
`Tab`), not only on pointer click-outside, so keyboard users don't leave an orphaned
open listbox.
