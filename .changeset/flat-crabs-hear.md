---
'@sumup/circuit-ui': major
---

A `sortLabel` for sortable Table columns (previously optional) is now required.

For sortable Table columns (when headers have the `sortable` prop set), the `sortLabel` prop is now required. This label is fundamental for accessibility. If it is omitted, the column will not be sortable, even if the `sortable` prop is set.

Here's an example sortable column header:

```ts
import { TableCell, TableSortDirection } from '@sumup/circuit-ui';

const headers: TableCell[] = [
  {
    children: 'Date',
    sortable: true,
    sortLabel: ({ direction }: { direction?: TableSortDirection }) => {
      const order = direction === 'ascending' ? 'descending' : 'ascending';
      return `Sort in ${order} order`;
    },
  },
];
```
