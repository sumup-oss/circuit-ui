---
'@sumup-oss/circuit-ui': minor
---

Added support to the PhoneNumberInput component for differentiating between countries that share a country calling code by area code. For example, to differentiate between Antigua & Barbuda and the USA which share the `+1` country code, provide the area code for Antigua & Barbuda (`268`) in the `countryCode.options` prop:

```tsx
function Component() {
  const options = [
    { country: 'US', code: '+1' },
    { country: 'AG', code: '+1', areaCode: '268' },
    // ...other countries
  ];
  return <PhoneNumberInput countryCode={{ options }} /* ...other props */ />;
}
```
