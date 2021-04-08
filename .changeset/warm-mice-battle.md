---
'@sumup/circuit-ui': major
---

---

## "@sumup/circuit-ui": major

Renamed the `Text` component to `Body` and mapped the styles to the new ones. The size prop is adapted to accept the new size numbers and it can be used now with 2 different sizes (eg. body-1, body-2).

The `Text` component's `bold`, `italic`, and `strike` props are removed. The `bold` prop is replaced by the `variant="highlight"` prop.

Additionally, the new `success`, `error` and `subtle` variants are added.

The `Blockquote` component is removed and replaced by the `Body` component with `variant="quote"`.
