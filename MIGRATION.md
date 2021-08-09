# Migration

- [🤖 Codemods](#-codemods)
- [From v2.x to v3](#from-v2x-to-v3)
  - [JSX runtime](#jsx-runtime)
  - [Typography XXX](#typography-xxx)
    - [Typography component names](#typography-component-names)
    - [Typography component variants](#typography-component-variants)
    - [New sizes](#new-sizes)
    - [Headline `as` props](#headline-as-props)
  - [Modal improvements](#modal-improvements)
  - [Accessibility](#accessibility)
  - [Other changes](#other-changes)
- [From v1.x to v2](#from-v1x-to-v2)
  - [Library format](#library-format)
  - [Peer dependencies](#peer-dependencies)
  - [Font loading](#font-loading)
  - [Forward custom props and refs](#forward-custom-props-and-refs)
  - [Component static properties](#component-static-properties)
  - [Removed components](#removed-components)
  - [Renamed components](#renamed-components)
  - [Changed components](#changed-components)
  - [Utilities](#utilities)
  - [Theme changes](#theme-changes)

## 🤖 Codemods

Some of the changes in this guide can be automated with _codemods_, small scripts that modify your app's source code automatically. Changes that can be codemodded are marked with a robot emoji (🤖) and the name of the transform (e.g. _button-variant-enum_). The codemods are built with [jscodeshift](https://github.com/facebook/jscodeshift) and can be run through the CLI that ships with Circuit UI. Here is an overview of all available options (you can view this help menu by running `yarn circuit-ui migrate --help`):

```sh
yarn circuit-ui migrate

Automatically transforms your source code to Circuit UI's latest APIs

Options:
  --language, -l   The programming language(s) of the files to be transformed
                [array] [required] [choices: "TypeScript", "JavaScript", "Flow"]
  --path, -p       A path to the folder that contains the files to be
                   transformed                           [string] [default: "."]
  --transform, -t  The transform to be applied to the source code
                       [string] [required] [choices: "button-variant-enum", ...]
```

You can only run one codemod at a time and we encourage you to apply the transforms incrementally and review the changes before continuing. The codemods don't cover all edge cases, so further manual changes might be necessary.

Tip: Provide the `--transform`/`-t` argument at the end of the command, so that as you run further codemods you can easily replace the last argument and reuse the command to run the next codemod.

> ⚠️ If you run into `'node\r': No such file or directory` when running the codemods with yarn, run them with node directly instead (this is a [known issue](https://github.com/facebook/jscodeshift/issues/424)).
>
> ```sh
> ./node_modules/.bin/circuit-ui migrate -l JavaScript -l TypeScript -t codemod-name
> ```

## From v2.x to v3

(intro)

### JSX runtime

(...)

### Typography XXX

Before v3, typography components were general purpose and flexible. There were no guidelines on when to use a certain typography style. This has led to inconsistent usage in our apps.

The new version introduces new, semantic typography components that make it clear when each should be used, are flexible enough to cover all use cases, and for the first time include semantic colors as well.

#### Typography component names

The core typography components were renamed:

| v2           | v3                                                     |
| ------------ | ------------------------------------------------------ |
| `Text`       | `Body`                                                 |
| `Heading`    | `Headline`                                             |
| `SubHeading` | `SubHeadline`                                          |
| `Blockquote` | See the [next section](#typography-component-variants) |

(🤖 _component-names-v3_.)

> Note that the codemod will also transform other renamed components (see [Other Changes](#other-changes).

#### Typography component variants

The `Body` (formerly `Text`) component's variants were changed:

| v2              | v3                           |
| --------------- | ---------------------------- |
| `<Text bold>`   | `<Body variant="highlight">` |
| `<Text italic>` | Use custom styles            |
| `<Text strike>` | Use custom styles            |
| `<Blockquote>`  | `<Body variant="quote">`     |

Use 🤖 _body-variant-highlight_ to migrate `bold` to `variant="highlight"`. Note that this will transform your `<p>` elements into inline `<strong>` elements: you might also need to pass `as="p"` if you need a block-level element.

> Bonus: the new `Body` component also supports the `success`, `error` and `subtle` semantic variants. Have a look at the [story](https://circuit.sumup.com/?path=/story/typography-body--variants) to get started.

#### New sizes

The number of available sizes was reduced, and size names were changed from the metric prefix scale (`kilo`, `mega` etc.) to numbers (`one`, `two` etc.).

##### Typography components `size` prop

The number of sizes was reduced in v3, here's the desired mapping from v2:

| v2                         | v3                                                               |
| -------------------------- | ---------------------------------------------------------------- |
| `<Heading size="kilo">`    | `<Headline size="four">`                                         |
| `<Heading size="mega">`    | `<Headline size="four">`                                         |
| `<Heading size="giga">`    | `<Headline size="three">`                                        |
| `<Heading size="tera">`    | `<Headline size="two">`                                          |
| `<Heading size="peta">`    | `<Headline size="one">`                                          |
| `<Heading size="exa">`     | `<Headline size="one">`                                          |
| `<Heading size="zetta">`   | Migrate manually to `size="one"` or use custom styles (2.625rem) |
| `<SubHeading size="kilo">` | `<SubHeadline>` (the sizes were removed)                         |
| `<SubHeading size="mega">` | `<SubHeadline>` (the sizes were removed)                         |
| `<Text size="kilo">`       | `<Body size="two">`                                              |
| `<Text size="mega">`       | `<Body size="one">`                                              |
| `<Text size="giga">`       | Migrate manually to `size="one"` or use custom styles (1.125rem) |

Most of these changes can be automated using the 🤖 _typography-sizes_ codemod.

The codemod will also warn about occurrences of `<Heading size="zetta">` and `<Text size="giga">`. These should be manually migrated to `size="one"` if possible, or alternatively to custom size styles (recommendation from design: 2.625rem for the `Headline` and 1.125rem for the `Body`).

##### Typography sizes mixins

The deprecated `text[Kilo|Mega|Giga]` style mixins were replaced by a single `typography` mixin, and the deprecated `heading[Kilo|Mega|Giga|Tera|Peta|Exa|Zetta]` and `subHeading[Kilo|Mega]` style mixins were removed.

> Generally, avoid using typography style mixins. Instead, use typography components directly.

#### Heading `as` props

The `as` prop is now required in both the **Headline** and the **SubHeadline** components, and restricted to HTML heading elements. This makes heading structure explicit, and ensures that heading components render semantic heading elements.

| Component            | Allowed `as` prop values           |
| -------------------- | ---------------------------------- |
| `Headline`           | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `SubHeadlineeadline` | `h2`, `h3`, `h4`, `h5`, `h6`       |

> Note that the `Headline` and `SubHeadline` will still fall back to `h2` and `h3`, respectively, but omitting the `as` prop will start throwing errors in the next major version.

#### Typography design tokens

The typography size values in `@sumup/design-tokens` were also updated to reflect the changes in `@sumup/circuit-ui`.

There is no codemod for these changes, migrate manually through search and replace (e.g. `typography.text.mega` 👉 `typography.body.one`). Refer to the tables in [Typography component names](#typography-component-names) and [Typography components `size` prop](#typography-components-size-prop) for the correct mappings.

> Generally, avoid using typography size tokens. Instead, use typography components directly.

### Modal improvements

(...)

### Accessibility

- enforced labels
- throwing errors + escape hatch
- as prop in headlines (also mentioned in typography)

### Other changes

- The **NotificationBanner** component has been renamed to **NotificationCard**. (🤖 _component-names-v3_)
- The **TableRow**, **TableHeader** and **TableCell** components are not exported anymore. Use the **Table** component instead.
- The **Button**, **IconButton**, (...) and **Hamburger** components' dimensions have been harmonized.
- The **SelectorGroup**'s `label` is now visible by default, pass `hideLabel` to hide it visually.
- (...)

## From v1.x to v2

### Library format

Circuit UI is now compiled with TypeScript instead of Babel ([#563](https://github.com/sumup-oss/circuit-ui/pull/563), [#597](https://github.com/sumup-oss/circuit-ui/pull/593)). ES and CJS versions are available as before, though this is not something you need to worry about since most bundlers pick the best format that they support automatically based on the `main` and `module` entries in `package.json`.

Note, however, that some modern JavaScript syntax and language features are no longer pretranspiled. Tools such as [react-scripts v2+](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and [Next.js](https://github.com/vercel/next.js) include `node_modules` in their transpilation process so Circuit UI works with them out of the box. If you have a custom build process, you should make sure that Circuit UI is transpiled like the rest of your source code.

We recommend testing your application in your oldest supported browsers to verify that it still works.

### Peer dependencies

Circuit UI v1 included React and Emotion dependencies as direct dependencies. This could cause these dependencies to be bundled twice if your application specified a different version of React or Emotion.

Circuit UI v2 moves these dependencies to peer dependencies, so Circuit UI will use whatever version your application specifies ([#485](https://github.com/sumup-oss/circuit-ui/pull/485)). The minimum version of React has been bumped to v16.8+ to support hooks.

If you haven't installed them already, you can do so by running the following command in your terminal:

```sh
# With yarn
yarn add react react-dom @emotion/core @emotion/styled emotion-theming
# With npm
npm install --save react-dom @emotion/core @emotion/styled emotion-theming
```

In Circuit UI v2 some functionality has been extracted into separate packages for easier maintenance. The themes have been moved to [@sumup/design-tokens](https://www.npmjs.com/package/@sumup/design-tokens), the icons are available from [@sumup/icons](https://www.npmjs.com/package/@sumup/icons), and the number & currency utils have been completely rewritten in [@sumup/intl](https://www.npmjs.com/package/@sumup/intl). The new [@sumup/collector](https://www.npmjs.com/package/@sumup/collector) package is used for event tracking. These packages are marked as required peer dependencies. To install them, run the following command in your terminal:

```sh
# With yarn
yarn add @sumup/collector @sumup/design-tokens @sumup/icons @sumup/intl
# With npm
npm install --save @sumup/collector @sumup/design-tokens @sumup/icons @sumup/intl
```

Refer to the individual packages for documentation on how to use them.

### Font loading

Circuit UI now downloads the Aktiv Grotesk font family in the 400 (regular) and 700 (bold) weights. It uses `@font-face` with the [`font-display`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) set to `swap`, which means a fallback font is shown until the custom fonts have loaded.

You should remove any code in your application that was previously used to load these fonts.

### Forward custom props and refs

A big theme of this release is consistency.

Any additional props that are passed to a component are now spread on their outermost child element ([#553](https://github.com/sumup-oss/circuit-ui/pull/553)). This is useful for test ids, data attributes, and custom styles using Emotion's `styled` function or `css` prop.

React `ref`s allow you to access the underlying DOM node of a component. All Circuit UI components now forward `ref`s to the underlying DOM node (for single node components such as a Button) or to the main interactive DOM node (for composite components such as an Input) ([#592](https://github.com/sumup-oss/circuit-ui/pull/592)).

> ⚠️ The ability to pass custom styles and `ref`s is meant as an escape hatch. We strongly recommend avoiding using them as we cannot guarantee that they will be compatible with future changes. Please consider opening an issue or PR to suggest the improvement in Circuit UI instead.

### Component static properties

Many components expose their configuration values as static properties. The `Text` component, for example, exposes its size options as `Text.KILO`, `Text.MEGA`, and `Text.GIGA`. The purpose of these static properties was to autocomplete the options and prevent typos.

Since Circuit UI is being migrated to TypeScript, the static properties are no longer necessary. VS Code can suggest and autocomplete the options based on the TypeScript types. TypeScript will warn you at build time if you use an unsupported or mistyped value. Furthermore, removing the static properties reduces the bundle size slightly.

Thus, the static properties have been removed from all components. Here's how you can pass a value to a component now:

```diff
import { Text } from '@sumup/circuit-ui';

const Hello = () => (
-  <Text size={Text.KILO}>Hello</Text>
+  <Text size="kilo">Hello</Text>
);
```

The affected components are: Badge, Blockquote, Button, ButtonGroup, Card, CardFooter, CardList.Item, Heading, InlineMessage, Input, List, MessageIcon, ModalFooter, NotificationIcon, Popover, ProgressBar, SubHeading, TableHeader, TableCell, Text, TextArea, and Tooltip.

(🤖 _component-static-properties_)

### Removed components

- The **SideNav** component has been removed. Use the Sidebar component instead.
- The **CreditCardDetails**, **CardNumberInput**, **NameOnCardInput**, **SecurityCodeInput**, **ExpiryDateInput**, and the credit card utils have been removed. Use [SumUp's card widget](https://developer.sumup.com/docs/widgets-card-v2) instead.
- The **CardSchemes** and **PaymentMethodIcon** components have been removed. Use [@sumup/icons](https://www.npmjs.com/package/@sumup/icons) instead.
- The **AutoCompleteInput** and **AutoCompleteTags** components have been removed. You can build them yourself using the SearchInput, Card, and Tag components.
- The **MaskedInput** and **RestrictedInput** components have been removed. Use [react-text-mask](https://www.npmjs.com/package/react-text-mask) or a similar package directly instead.
- The **MessageIcon** and **MessageButton** components have been removed. Use the Notification component's icon and children props instead.
- The **Markdown** component has been removed. Use [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) or a similar package instead.
- The **State** component has been removed. Use React's [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook instead.
- The **Picture** component has been removed. Use the native HTML `picture` element instead.

### Renamed components

- The **ListView** component has been renamed to **CardList** (🤖 _component-names-v2_)
- The **SvgButton** component has been renamed to **IconButton** (🤖 _component-names-v2_)
- The **Message** component has been renamed to **Notification** (🤖 _component-names-v2_)
- The **InlineNotification** component has been renamed to **InlineMessage** (🤖 _component-names-v2_)
- The **GlobalStyles** component has been renamed to **BaseStyles** (🤖 _component-names-v2_)

### Changed components

- The **GlobalStyles** component no longer accepts a `custom` prop. Use Emotion's [Global](https://emotion.sh/docs/globals) component instead.
- The **Heading**, **SubHeading**, **Text**, and **Input** components no longer accept the `element` prop. Emotion 10 introduced the ability to change the HTML element. Use the `as` prop instead (🤖 _as-prop_)
- The **List** component's `ordered` prop has been replaced by the `variant` enum prop (🤖 _list-variant-enum_)
- The **List** component's default size is now `mega` to match the Text component.
- The **Badge** component's `color` prop has been renamed to `variant` (🤖 _badge-variant-enum_)
- The `primary` and `secondary` **Button** boolean props have been removed. Use the `variant` enum prop instead (🤖 _button-variant-enum_)
- The `plain` **Button** prop has been removed. Use the new Anchor component or the `tertiary` Button variant instead.
- The `flat` **Button** variant has been removed (🤖 _button-variant-enum_)
- The `giga` **Button** size has been removed. Use the `mega` size (default) instead (🤖 _button-size-giga_)
- The **LoadingButton**'s exit animations have been removed. An action's success or error result should be communicated outside the button (🤖 _exit-animations_)
- The **Input**, **TextArea**, and **Select** components have the label built in now. Use the `label` prop to pass in the label content and remove the Label component from your code. The `label` prop will become required in the next major version of Circuit UI.
- The **Input** and **Textarea** components no longer accept `*ClassName` props. Emotion 10 uses style objects instead of class names. Use the `*Styles` props instead. The `wrapperStyles` prop has been renamed to `labelStyles` (🤖 _input-styles-prop_).
- The **Input** and **Textarea** components' `deepRef` prop has been renamed to `ref` (🤖 _input-deepref-prop_)
- The **Input** and **Textarea** components no longer have an `optional` state. Add "(optional)" to the label text instead.
- The **Selector** component's `onClick` and `selected` props have been renamed to `onChange` and `checked` (🤖 _selector-props_). The `value` and `name` have been added as required props.
- The **RadioButton**, **Toggle**, and **Switch** component's `onToggle` prop has been renamed to `onChange` (🤖 _onchange-prop_)
- The **Toggle** component's `on`, `labelOn`, and `labelOff` props have been renamed to `checked`, `labelChecked`, and `labelUnchecked` (🤖 _toggle-checked-prop_).
- The **IconButton** component's dimensions and style have changed. It is now consistent with the Button component.
- The **Hamburger** component's default size has been increased to match the IconButton component.
- The **Hamburger** component's `light` prop has been removed. Set the color through CSS instead.
- The **Spinner** component's `dark` prop has been removed. Set the color through CSS instead.
- The **InlineMessage** component's `type` prop has been renamed to `variant` (🤖 _inline-message-variant-enum_)
- The **Pagination** component's `footer`, `justify`, `align`, `perPage`, and `pagesToShow` props have been removed. The `page` prop has been renamed to `currentPage`. The `total` prop has been replaced by the `totalPages` prop which represents the total number of pages as opposed to the total number of items (`totalPages = Math.ceil(total / perPage)`).

### Utilities

- The `currencyAmountUtils` have been removed. There is no replacement, we suggest you copy the [old implementation](https://github.com/sumup-oss/circuit-ui/blob/b3d89f43ac54ef1f7c0c2ff6f4edce92e2bd937d/src/components/CurrencyInput/CurrencyInputService.js) to your application.
- The `currencyUtils` have been removed. Use [@sumup/intl](https://www.npmjs.com/package/@sumup/intl) instead (🤖 _currency-utils_)
- The `textTera` style helper has been removed. Use the `textGiga` style helper instead.
- The `shadowGround` and `shadowBorder` style helpers have been removed. Use the [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) CSS property instead.
- The unit style helpers (`addUnit`, `subtractUnit`, `multiplyUnit`, `divideUnit` ) have been removed. Use the CSS [`calc`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function instead.

### Theme changes

- The themes have been moved to [@sumup/design-tokens](https://www.npmjs.com/package/@sumup/design-tokens). Import them from there instead (🤖 _theme-to-design-tokens_)
- The `iconSizes.byte` theme value has been removed. Use `iconSizes.kilo` instead (🤖 _theme-icon-sizes_)
- The `grid.afterTera` theme value has been renamed to `grid.tera` (🤖 _theme-grid-tera_)
