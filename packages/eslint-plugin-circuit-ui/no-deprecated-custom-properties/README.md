# Replace deprecated CSS custom properties (`no-deprecated-custom-properties`)

Occasionally, CSS custom properties are removed or renamed. This rule flags uses of deprecated custom properties.

## Rule Details

Examples of **incorrect** code for this rule:

```css
.class {
  font-size: var(--cui-typography-headline-one-font-size);
  line-height: var(--cui-typography-headline-one-line-height);
}
```

Examples of **correct** code for this rule:

```css
.class {
  font-size: var(--cui-typography-headline-l-font-size);
  line-height: var(--cui-typography-headline-l-line-height);
}
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
- [Design token release notes](https://github.com/sumup-oss/circuit-ui/blob/main/packages/design-tokens/CHANGELOG.md)
