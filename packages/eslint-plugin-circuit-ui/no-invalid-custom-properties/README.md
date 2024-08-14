# Do not use invalid Circuit UI custom properties (`no-invalid-custom-properties`)

Circuit UI exports a number of CSS custom properties (a.k.a. CSS variables) prefixed with `--cui-`. This rule checks that custom properties using that prefix are valid.

## Rule Details

This rule aims to prevent issues when using custom properties. In contrast to the legacy JSON theme in `@sumup-oss/design-tokens`, IDEs and CIs will _not_ warn or error by default if using an invalid property. Setting its error level to `error` (or `2`) is recommended.

Examples of **incorrect** code for this rule:

```css
color: var(--cui-invalid-property);
```

Examples of **correct** code for this rule:

```css
color: var(--cui-bg-normal);
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) on the Circuit UI docs
