---
'@sumup/circuit-ui': major
---

Default `data-testid`s are no longer built into the `Table` component. They can still be passed manually. We also recommend [querying by role](https://testing-library.com/docs/queries/about/#priority) in tests, for them to resemble how users interact with the code. You can find examples in the component's specs.
