---
'@sumup/circuit-ui': major
---

Tweaked the `ButtonGroup` component to switch between a secondary button (on viewports of at least `mq.kilo`) and a tertiary button (on viewports narrower than `mq.kilo`) using CSS media queries instead of rendering three buttons. Tests (e.g. using `@testing-library`) can now query the secondary button without using `*AllBy` queries.
