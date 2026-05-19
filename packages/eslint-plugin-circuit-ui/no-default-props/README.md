# no-default-props

Omit explicitly passed props when they match Circuit UI defaults and do not
change the rendered output.

## Rule Details

This rule flags a small allowlist of redundant props and removes them
automatically. It is intentionally explicit rather than trying to infer defaults
from component implementations.

Known conditional cases:

- `Body as="p"` is only removed when `variant` is absent or statically known not
  to be `highlight` or `quote`.
- `Body weight="regular"` is only removed when `as` is absent or statically
  known not to be `strong`.

Use standard ESLint disable comments for exceptions when a codebase prefers to
keep a default prop explicit in a specific location.

## Examples

Examples of **incorrect** code for this rule:

```jsx
import { Body, Button, IconButton } from '@sumup-oss/circuit-ui';

<Body size="m" color="normal">Hello</Body>;
<Button size="m" variant="secondary">Submit</Button>;
<IconButton size="m" variant="secondary" icon={More}>
  More
</IconButton>;
```

Examples of **correct** code for this rule:

```jsx
import { Body, Button, IconButton } from '@sumup-oss/circuit-ui';

<Body>Hello</Body>;
<Button>Submit</Button>;
<IconButton icon={More}>More</IconButton>;
```
