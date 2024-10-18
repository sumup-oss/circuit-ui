---
"@sumup-oss/circuit-ui": major
---

Marked the `ColorInput` and `PhoneNumberInput` components as stable. Update the related imports:

```diff
- import { ColorInput, type ColorInputProps } from '@sumup-oss/circuit-ui/experimental';
+ import { ColorInput, type ColorInputProps } from '@sumup-oss/circuit-ui';
```

```diff
- import { PhoneNumberInput, type PhoneNumberInputProps } from '@sumup-oss/circuit-ui/experimental';
+ import { PhoneNumberInput, type PhoneNumberInputProps } from '@sumup-oss/circuit-ui';
```
