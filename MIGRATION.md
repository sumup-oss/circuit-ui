# Migration

- [Codemods](#-codemods)
- [From v1.x to v2](#from-v1.x-to-v2)
  - [Library format](#library-format)
  - [Peer dependencies](#peer-dependencies)
  - [Forward custom props and refs](#forward-custom-props-and-refs)
  - [Removed components](#removed-components)
  - [Renamed components](#renamed-components)
  - [Changed components](#changed-components)
  - [Utilities](#utilities)
  - [Changes to the theme](#changes-to-the-theme)

## 🤖 Codemods

Some of the changes in this guide can be automated with _codemods_, small scripts that modify the source code automatically. Changes that can be codemodded are marked with a robot emoji (🤖) and the name of the transform (e.g. _button-props_). The codemods are built with [jscodeshift](https://github.com/facebook/jscodeshift) and can be run through the Circuit UI CLI. Here is an overview of all available options (you can view this help menu by running `yarn circuit-ui migrate --help`):

```sh
yarn circuit-ui migrate

Automatically transforms your source code to Circuit UI's latest APIs

Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --transform, -t  The transform to be applied to the source code
                                   [string] [required] [choices: "button-props"]
  --language, -l   The programming language of the files to be transformed
                       [string] [required] [choices: "TypeScript", "JavaScript"]
  --path, -p       A path to the folder that contains the files to be
                   transformed                           [string] [default: "."]
```

You can only run one codemod at a time and we encourage you to apply the transforms incrementally and review the changes before continuing. The codemods don't cover all edge cases, so further manual changes might be necessary.

## From v1.x to v2

### Library format

Circuit UI is now compiled with TypeScript instead of Babel (#563, #597). ES and CJS versions are available as before, though this is not something you need to worry about since most bundlers pick the best format that they support automatically based on the `main` and `module` entries in `package.json`.

Note, however, that some modern JavaScript syntax and language features are no longer pretranspiled. Tools such as [react-scripts v2+](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts) and [Next.js](https://github.com/vercel/next.js) include `node_modules` in their transpilation process so Circuit UI works with them out of the box. If you have a custom build process, you should make sure that Circuit UI is transpiled like the rest of your source code.

We recommend testing your application in your oldest supported browsers to verify that it still works.

### Peer dependencies

Circuit UI v1 included React and Emotion dependencies as direct dependencies. This could cause these dependencies to be bundled twice if your application specified a different version of React or Emotion.

Circuit UI v2 moves these dependencies to peer dependencies, so Circuit UI will use whatever version your application specifies (#485). The minimum version of React has been bumped to 16.8+ to support hooks.

If you haven't installed them already, you can do so by running the following command in your terminal:

```sh
# With yarn
yarn add react react-dom @emotion/core @emotion/styled emotion-theming
# With npm
npm install --save react-dom @emotion/core @emotion/styled emotion-theming
```

In Circuit UI v2 some functionality has been extracted into separate packages for easier maintenance. The themes have been moved to [@sumup/design-tokens](https://www.npmjs.com/package/@sumup/design-tokens), the icons are available from [@sumup/icons](https://www.npmjs.com/package/@sumup/icons), and the number & currency utils have been completely rewritten in [@sumup/intl](https://www.npmjs.com/package/@sumup/intl). These packages are also marked as required peer dependencies. To install them, run the following command in your terminal:

```sh
# With yarn
yarn add @sumup/design-tokens @sumup/icons @sumup/intl
# With npm
npm install --save @sumup/design-tokens @sumup/icons @sumup/intl
```

Refer to the individual packages for documentation on how to use them.

### Forward custom props and refs

Any additional props that are passed to a component are now spread on their outermost child element (#553). This is useful for test ids, data attributes, and custom styles using Emotion's `styled` function or `css` prop.

React [`ref`s](https://reactjs.org/docs/refs-and-the-dom.html) allow you to access the underlying DOM node of a component. All Circuit UI components now forward `ref`s to the underlying DOM node (for single node components such as a Button) or to the main interactive DOM node (for composite components such as an Input) (#592).

⚠️ _The ability to pass custom styles and `ref`s is meant as an escape hatch. We strongly recommend to avoid using them as we cannot guarantee that they will be compatible with future changes. Please open an issue or PR to suggest the improvement in Circuit UI instead._

### Removed components

- The **SideNav** component has been removed. Use the Sidebar component instead.
- The **CreditCardDetails**, **CardNumberInput**, **NameOnCardInput**, **SecurityCodeInput**, **ExpiryDateInput**, and the credit card utils have been removed. Use [SumUp's card widget](https://developer.sumup.com/docs/widgets-card-v2) instead.
- The **CardSchemes** and **PaymentMethodIcon** components have been removed. Use [@sumup/icons](https://www.npmjs.com/package/@sumup/icons) instead.
- The **AutoCompleteInput** and **AutoCompleteTags** components have been removed. You can build them yourself using the SearchInput, Card, and Tag components.
- The **MaskedInput** and **RestrictedInput** components have been removed. Use [react-text-mask](https://www.npmjs.com/package/react-text-mask) or a similar package directly instead.
- The **Markdown** component has been removed. Use [markdown-to-jsx](https://www.npmjs.com/package/markdown-to-jsx) or a similar package directly instead.
- The **State** component has been removed. Use React's [useState](https://reactjs.org/docs/hooks-reference.html#usestate) hook instead.
- The **Picture** component has been removed. Use the native HTML `picture` element instead.

### Renamed components

- 🤖 The **ListView** component has been renamed to **CardList**.
- 🤖 The **SvgButton** component has been renamed to **IconButton**.
- 🤖 The **Message** component has been renamed to **Notification**.
- 🤖 The **InlineNotification** component has been renamed to **InlineMessage**.
- 🤖 The **GlobalStyles** component has been renamed to **BaseStyles**.

### Changed components

- The **GlobalStyles** component no longer accepts a `custom` prop. Use Emotion's [Global](https://emotion.sh/docs/globals) component instead.
- 🤖 The **RadioButton** and **Switch** components no longer accept the `onToggle` prop. Use the `onChange` prop instead.
- The **Input** and **Textarea** components no longer accept `*ClassName` props. Emotion 10 uses style objects instead of class names. Use the `*Styles` props instead.
- 🤖 The **Heading**, **SubHeading**, **Text**, and **Input** components no longer accept the `element` prop. Emotion 10 introduced the ability to change the HTML element. Use the `as` prop instead.
- 🤖 The **Selector** component no longer accepts the `onClick` and `selected` props. Use the `onChange` and `checked` props instead. The `value` and `name` have been added as required props.
- The **RadioButtonGroup** component's `label` property inside the `options` prop has been renamed to `children`.
- The **Hamburger** component's `light` prop has been removed. Set the color through CSS instead.
- The **LoadingButton**'s exit animations have been removed. An action's success or error result should be communicated outside the button.
- 🤖 The `flat` **Button** variant has been removed (🤖 _button props_)
- The `plain` **Button** prop has been removed. Use the new Anchor component or the `tertiary` Button variant instead.
- The **Button** component doesn't have static properties anymore ...
- The `primary` and `secondary` **Button** boolean props have been removed. Use the `variant` enum prop instead (🤖 _button props_)
- combine label with form input components
- 🤖 The **List** component's `ordered` prop has been replaced by the `variant` enum prop.
- The **List** component's default size is now `mega` to match the Text component.
- 🤖 The Heading component doesn't export sizes anymore. Instead of writing `size={Heading.GIGA}`, write `size="giga"`. Button, Text ...

### Utilities

- The currencyUtils and currencyAmountUtils have been removed. Use [@sumup/intl](https://www.npmjs.com/package/@sumup/intl) instead.
- The `shadowGround` and `textTera` style helpers have been removed.
- The `shadowBorder` style helper has been removed. Use the [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) CSS property instead.
- The unit style helpers have been removed. Use the CSS [`calc`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function instead.

### Changes to the theme

- 🤖? The themes have been moved to [@sumup/design-tokens](https://www.npmjs.com/package/@sumup/design-tokens). Import them from there instead.
- 🤖 The `iconSizes.byte` theme value has been removed. Use `iconSizes.kilo` instead.
- 🤖 The `grid.afterTera` theme value has been renamed to `grid.tera`.

---

## New features

components: Carousel and Step components (#482)
components: add Anchor component (#583)
