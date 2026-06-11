
# Remove deprecated `spacing` mixin (`no-deprecated-spacing-mixin`)

Circuit UI’s legacy Emotion mixins are deprecated and will be removed in the next major release.
This rule reports usages of the `spacing` mixin and helps migrate them to utility spacing classes.

## Rule Details

This rule aims to speed up the migration away from Emotion.js. Utility spacing classes are available as an alternative to the `spacing` mixin and should be used instead. Setting the rule's error level to warn (or 1) is recommended.
When upgrading to the next major version of Circuit UI (v12.0.0), set the rule's error level to error (or 2) to help migrate any remaining usages.

Examples of **incorrect** code for this rule:

```tsx
function Component() {
  return <Body variant="alert" />;
}
```

Examples of **correct** code for this rule:

```tsx
function Component() {
  return <Body css={spacing('giga')} />;
}
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Utility classes](https://circuit.sumup.com/?path=/docs/features-utility-classes--docs)
- [V11.0.0 release notes](https://github.com/sumup-oss/circuit-ui/releases/tag/%40sumup-oss%2Fcircuit-ui%4011.0.0)
