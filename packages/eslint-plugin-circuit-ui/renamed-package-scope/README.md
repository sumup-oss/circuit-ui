# Import from the renamed package scope (`renamed-package-scope`)

Circuit UI packages have moved from the `@sumup` to the `@sumup-oss` scope.

## Rule Details

This rule flags imports that use the old package scope (`@sumup`) and can automatically update them to the new one (`@sumup-oss`). Setting the rule's error level to `error` (or `2`) is recommended.

Examples of **incorrect** code for this rule:

```tsx
import { Input } from '@sumup/circuit-ui';
import { Search } from '@sumup/icons';
import '@sumup/design-tokens/light.css';
```

Examples of **correct** code for this rule:

```tsx
import { Input } from '@sumup-oss/circuit-ui';
import { Search } from '@sumup-oss/icons';
import '@sumup-oss/design-tokens/light.css';
```

### Options

n/a

## When Not To Use It

n/a

## Further Reading

- [Migration guide](https://github.com/sumup-oss/circuit-ui/blob/main/MIGRATION.md)
