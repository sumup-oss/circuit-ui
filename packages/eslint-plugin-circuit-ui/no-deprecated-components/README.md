# Remove deprecated components (`no-deprecated-components`)

Occasionally, components are removed from Circuit UI. This rule flags uses of deprecated components.

## Rule Details

A component is removed in two stages:

1. The component is marked as deprecated in a minor release. In this phase, setting the rule's error level to `warn` (or `1`) is recommended.
2. The component is removed in the next major release. In this phase, setting the rule's error level to `error` (or `2`) is recommended.

When upgrading Circuit UI, it is recommended to upgrade to the latest minor version, remove or replace the component using the suggestions from this rule, then upgrade to the next major.

Examples of **incorrect** code for this rule:

```tsx
// Since Circuit UI v6.4
import { RadioButton, Selector } from '@sumup/circuit-ui';
```

Examples of **correct** code for this rule:

```tsx
// Since Circuit UI v6.4
import { RadioButtonGroup, SelectorGroup } from '@sumup/circuit-ui';
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Circuit UI release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md)
