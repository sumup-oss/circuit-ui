---
'@sumup/circuit-ui': minor
---

Migrated the `Grid`, `Row`, and `Col` components to TypeScript. The `Col` component's `span` and `skip` props now accept numbers or numeric strings, even when nested in a breakpoints object. Here are some examples:

```tsx
<Col span={2} />
<Col span="2" />
<Col span={{ default: 2, kilo: "4" }} />
```
