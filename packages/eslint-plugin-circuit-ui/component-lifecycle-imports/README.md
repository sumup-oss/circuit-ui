# Import components from the entrypoint for their lifecycle stage (`component-lifecycle-imports`)

Circuit UI components move through different stages throughout their [lifecycle](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs). Each stage is associated with its own package entrypoint.

## Rule Details

This rule flags components that have moved to a different stage and can automatically update their imports. Setting the rule's error level to `error` (or `2`) is recommended.

Examples of **incorrect** code for this rule:

```tsx
import { RangePicker } from '@sumup-oss/circuit-ui';
import type { RangePickerProps } from '@sumup-oss/circuit-ui';
```

Examples of **correct** code for this rule:

```tsx
import { RangePicker } from '@sumup-oss/circuit-ui/legacy';
import type { RangePickerProps } from '@sumup-oss/circuit-ui/legacy';
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Component lifecycle documentation](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) on the Circuit UI docs
