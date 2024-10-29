---
"@sumup-oss/circuit-ui": major
---

Marked the `Tooltip` and `Toggletip` components as stable. Update the related imports:

```diff
- import { Tooltip, type TooltipProps, type TooltipReferenceProps } from '@sumup-oss/circuit-ui/experimental';
+ import { Tooltip, type TooltipProps, type TooltipReferenceProps } from '@sumup-oss/circuit-ui';
```

```diff
- import { Toggletip, type ToggletipProps } from '@sumup-oss/circuit-ui/experimental';
+ import { Toggletip, type ToggletipProps } from '@sumup-oss/circuit-ui';
```

