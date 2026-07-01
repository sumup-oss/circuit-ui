# Update deprecated icons (`no-deprecated-icons`)

Circuit UI's icon library evolves along with our visual identity. Over time, some icons can become obsolete or renamed. This rule flags outdated icon imports and usages and can automatically update them with the suggested alternatives.

## Rule Details
Icons are marked as deprecated in minor releases to be later removed in major releases.
Set this rule to warn (or 1) to get a warning when using deprecated icons with minor releases.
When upgrading Circuit UI to the next major, set the rule's error level to error (or 2) to help migrate deprecated icons.

- If the icon has no direct replacement, show the deprecation message as is, no fixes are applied.
- If the icon has a direct replacement, the rule warns about/replaces the icon import and usages with the proposed alternative.
- If the icon has multiple direct alternatives, propose suggestions for all of them; no fixes are applied.

Examples of **incorrect** code for this rule:

```tsx
import { Add } from '@sumup-oss/icons'
function Component() {
  return <Add />;
}
```

Examples of **correct** code for this rule:

```tsx
import { FlagFr } from '@sumup-oss/icons';
function Component() {
  return <FlagFr />
}
```

### Options

n/a

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Circuit UI release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md)
