# Do not use invalid Circuit UI custom properties (`prefer-custom-properties`)

Circuit UI's Emotion.js theme is being replaced with CSS custom properties (a.k.a. CSS variables). This rule flags uses of the Emotion.js theme and can automatically rewrite them to CSS custom properties.

## Rule Details

This rule aims to automate the migration to CSS custom properties. CSS custom properties are widely supported and more performant to update than Emotion.js' theme object that is passed to components via React context. Setting the rule's error level to `warn` (or `1`) is recommended.

Examples of **incorrect** code for this rule:

```ts
const styles = (theme) => css`
  padding: ${theme.spacings.kilo};
`;

const Box = styled.div`
  padding: ${(theme) => theme.spacings.kilo};
`;
```

Examples of **correct** code for this rule:

```ts
const styles = () => css`
  padding: var(--cui-spacings-kilo);
`;

// CSS custom properties aren't supported inside media queries
const unsupportedTokens = (theme) => css`
  ${theme.mq.kilo} {
    padding: var(--cui-spacings-kilo);
  }
`;
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) on the Circuit UI docs
