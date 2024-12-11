---
'@sumup-oss/circuit-ui': patch
---

Fixed a regression that [breaks Jest and Vitest tests](https://github.com/dperini/nwsapi/issues?q=sort%3Aupdated-desc+is%3Aissue+focus-visible+) when [matching elements](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) using the `:focus-visible` selector.
