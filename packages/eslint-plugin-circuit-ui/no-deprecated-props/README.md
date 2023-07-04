# Remove deprecated component props (`no-deprecated-props`)

Occasionally, props are removed from Circuit UI components. This rule flags uses of deprecated props.

## Rule Details

A component prop is removed in two stages:

1. The prop is marked as deprecated in a minor release. In this phase, setting the rule's error level to `warn` (or `1`) is recommended.
2. The prop is removed in the next major release. In this phase, setting the rule's error level to `error` (or `2`) is recommended.

When upgrading Circuit UI, it is recommended to upgrade to the latest minor version, remove or replace the prop using the suggestions from this rule, then upgrade to the next major.

Note that the rule can only lint direct uses of a component. Wrapped instances such as styled components are not supported.

Examples of **incorrect** code for this rule:

```tsx
// Since Circuit UI v6.4
function Component() {
  return (
    <div>
      <Button tracking={{ label: 'login' }} />
      <Checkbox tracking={{ label: 'terms' }} />
      {/* ...any many other components */}
    </div>
  );
}
```

Examples of **correct** code for this rule:

```tsx
// Since Circuit UI v6.4
function Component() {
  return (
    <div>
      <Button />
      <Checkbox />
    </div>
  );
}
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Circuit UI release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md)
