---
'@sumup/circuit-ui': major
---

The new semantic typography components make it clear when each should be used, are flexible enough to cover all use cases. To represent more semantic variations some of the sizes have been removed and new size names added.

#### Headline

Renamed the `Heading` component to `Headline` and mapped the styles to the new ones. These changes are codemodded (🤖 _component-names-typography_).
The size prop has been changed to accept the new size numbers. For `Headline` component **_exa_** and **_peta_** has been changed to **_one_** with new values, **_tera_** has been changed to **_two_**, **_giga_** to **_three_**, **_mega_** and **_kilo_** to **_four_** (🤖 _typography-sizes_)

Usage example:

`<Heading size="kilo" />` will be mapped to
`<Headline size="four" />`

#### SubHeadline

Renamed the `SubHeading` component to `SubHeadline` and mapped the styles to the new ones (🤖 _component-names-typography_). The `SubHeadline` component now uses only one size value (🤖 _typography-sizes_).

#### Body

The `Text` component has been renamed to `Body` (🤖 _component-names-typography_). The size prop is adapted to accept the new size numbers and **_giga_** size has been removed, **_mega_** and **_kilo_** sizes have been changed to **_one_** and **_two_** respectively.

Usage example:

`<Text size="mega" />` will be mapped to
`<Body size="one" />`

The `Text` component's bold prop has been removed. Use the `Body` component `(variant="highlight")` instead (🤖 body-variant-highlight).

Usage example:

`<Body variant="highlight">bold</Body>`

The `Text` component's italic and strike props has been removed. Use the custom styles instead.

Additionally, the new `success`, `error` and `subtle` variants are added.

The `Blockquote` component is removed and replaced by the `Body` component with `variant="quote"`.

Usage example:

`<Body variant="quote">quote</Body>`
