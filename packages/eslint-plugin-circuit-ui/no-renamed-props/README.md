# Update renamed component props (`no-renamed-props`)

Occasionally, Circuit UI's component props are renamed for consistency. This rule flags uses of outdated prop names and values and can automatically update them.

## Rule Details

A component prop or its values are renamed in two stages:

1. Support for the new name(s) is added in a minor release. The old name(s) are marked as deprecated in the same release. In this phase, setting the rule's error level to `warn` (or `1`) is recommended.
2. The old name(s) are removed in the next major release. In this phase, setting the rule's error level to `error` (or `2`) is recommended.

When upgrading Circuit UI, it is recommended to upgrade to the latest minor version, update the prop names using the suggestions from this rule, and then upgrade to the next major.

Note that the rule can only lint direct uses of a component. Wrapped instances such as styled components are not supported.

Examples of **incorrect** code for this rule:

```tsx
// Since Circuit UI v7.5
function Component() {
  return (
    <div>
      <Avatar size="giga" />
      <Hamburger size="kilo" />
      <ProgressBar size="byte" />
      <SelectorGroup size="kilo" />
      <Spinner size="byte" />
      <Button size="kilo" />
      <Button>Submit</Button>
      <Button icon={Plus} />
    </div>
  );
}

// Since Circuit UI v6.8
function Component() {
  return <Toggle explanation="Description" />;
}

// Since Circuit UI v6.4
function Component() {
  return (
    <div>
      <Badge variant="confirm" />
      <NotificationInline variant="confirm" />
      <NotificationToast variant="confirm" />
    </div>
  );
}
```

Examples of **correct** code for this rule:

```tsx
// Since Circuit UI v7.5
function Component() {
  return (
    <div>
      <Avatar size="s" />
      <Hamburger size="s" />
      <ProgressBar size="s" />
      <SelectorGroup size="s" />
      <Spinner size="s" />
      <Button size="s" />
      <Button label="Submit" />
      <Button leadingIcon={Plus} />
    </div>
  );
}

// Since Circuit UI v6.8
function Component() {
  return <Toggle description="Description" />;
}

// Since Circuit UI v6.4
function Component() {
  return (
    <div>
      <Badge variant="success" />
      <NotificationInline variant="success" />
      <NotificationToast variant="success" />
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
