---
'@sumup/circuit-ui': major
---

Changed how custom styles are forwarded to the `Input` and `Textarea` components. The `className` and `style` props are now passed to the outermost `div` (this also applies to Emotion's `css` prop). The `labelStyles` prop has been removed. This aligns the components with other form components and makes it easier to apply style mixins such as `spacing`.
