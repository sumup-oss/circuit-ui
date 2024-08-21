# Do not use deprecated Circuit UI custom properties (`no-deprecated-custom-properties`)

Occasionally, CSS custom properties are removed or renamed. This rule flags uses of deprecated custom properties.

## Rule Details

Examples of **incorrect** code for this rule:

```css
color: var(--cui-typography-headline-one-font-size);
```

Examples of **correct** code for this rule:

```css
color: var(--cui-typography-headline-l-font-size);
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) on the Circuit UI docs
- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Design token release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/design-tokens/CHANGELOG.md)
