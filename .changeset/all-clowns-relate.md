---
"@sumup-oss/circuit-ui": patch
---

Fixed an issue where disabled or read-only input fields could still be cleared via the clear button (SeachInput and AutocompleteInput). The clear button is now only shown when the input is editable.
