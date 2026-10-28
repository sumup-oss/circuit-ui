---
"@sumup-oss/circuit-ui": minor
---

Updated the NotificationBanner action to accept all Button variants (`primary`, `secondary` and `tertiary`) with default as `primary`.

Previously, the action's `tertiary` variant was remapped and rendered as a `secondary` button  while every other value, including `secondary`, rendered as a `primary` button. The variant is no longer remapped, and the `tertiary` deprecation warning has been removed. 

Now passing:
- `variant: 'tertiary'` renders a tertiary button. To keep the previous appearance, use `variant: 'secondary'`.
- `variant: 'secondary'` renders a secondary button instead of a primary one. To keep the previous appearance, use `variant: 'primary'` or omit the variant.
- `variant: 'primary'` or no variant still renders a primary button.
