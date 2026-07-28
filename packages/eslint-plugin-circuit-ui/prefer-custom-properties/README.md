# Do not use invalid Circuit UI custom properties (`prefer-custom-properties`)

Circuit UI's Emotion.js theme has been removed in favor of CSS custom properties (a.k.a. CSS variables). This rule flags uses of the Emotion.js theme and automatically replaces them with CSS custom properties.

## Rule Details

This rule automates the migration to CSS custom properties. 
Circuit UI v12 and newer no longer export an Emotion.js theme object, and setting the rule's error level to `error` (or `2`) will help you identify and fix any remaining uses of the theme.

Examples of **incorrect** code for this rule:

```tsx
const styles = (theme) => css`
  padding: ${theme.spacings.kilo};
`;

const Box = styled.div`
  padding: ${(theme) => theme.spacings.kilo};
`;

function Component() {
  const theme = useTheme();
  return <div style={{ padding: theme.spacings.kilo }} />;
}
```

Examples of **correct** code for this rule:

```tsx
const styles = () => css`
  padding: var(--cui-spacings-kilo);
`;

const Box = styled.div`
  padding: var(--cui-spacings-kilo);
`;

function Component() {
  return <div style={{ padding: 'var(--cui-spacings-kilo)' }} />;
}

// CSS custom properties aren't supported inside media queries,
// so the rule doesn't flag or replace `theme.mq.*` tokens.
const mediaQueries = (theme) => css`
  ${theme.mq.kilo} {
    display: flex;
  }
`;
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Theme documentation](https://circuit.sumup.com/?path=/docs/features-theme--docs) on the Circuit UI docs
