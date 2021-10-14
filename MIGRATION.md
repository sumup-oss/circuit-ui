# Migration <!-- omit in toc -->

- [🤖 Codemods](#-codemods)
- [From v4 to v4.1](#from-v4-to-v41)
  - [Combined LoadingButton and Button](#combined-loadingbutton-and-button)
- [From v3.x to v4](#from-v3x-to-v4)
  - [Emotion 11](#emotion-11)
    - [New package names](#new-package-names)
    - [Better TypeScript support](#better-typescript-support)
      - [Typing the theme](#typing-the-theme)
    - [Compatibility with Storybook](#compatibility-with-storybook)
  - [New brand icons](#new-brand-icons)
    - [Overview of `@sumup/icons` v2](#overview-of-sumupicons-v2)
    - [Migrating to `@sumup/icons` v2](#migrating-to-sumupicons-v2)
- [From v2.x to v3](#from-v2x-to-v3)
  - [Dependencies](#dependencies)
  - [Accessibility](#accessibility)
  - [New JSX transform](#new-jsx-transform)
  - [Typography](#typography)
    - [Typography component names](#typography-component-names)
    - [Typography component variants](#typography-component-variants)
    - [New sizes](#new-sizes)
      - [Typography components `size` prop](#typography-components-size-prop)
      - [Typography sizes mixins](#typography-sizes-mixins)
    - [Heading `as` props](#heading-as-props)
    - [Typography design tokens](#typography-design-tokens)
  - [New modal and popover APIs](#new-modal-and-popover-apis)
    - [Modal](#modal)
    - [Popover](#popover)
  - [Component heights](#component-heights)
  - [Other changes](#other-changes)
  - [Cleaning up](#cleaning-up)
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

## From v4 to v4.1

### Combined LoadingButton and Button

The LoadingButton is an extension of the Button component and adds a loading state. This is a common use case, so the loading functionality has been added to the Button component itself and the LoadingButton has been deprecated and will be removed in the next major release. This means that you can replace the LoadingButton with the Button component (🤖 _component-names-v4-1_).

## From v3.x to v4

Circuit v4 is a small maintenance release, featuring the upgrade to Emotion 11 and new brand icons.

To get started, upgrade `@sumup/circuit-ui` and its peer dependencies:

```sh
yarn upgrade @sumup/circuit-ui @sumup/design-tokens @sumup/icons --latest
```

> For a complete list of changes, refer to the [changelog](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md).

### Emotion 11

Circuit was upgraded to Emotion 11, so apps using Circuit will also have to upgrade. The main changes are Emotion's new package names and better TypeScript support.

#### New package names

The main change in Emotion 11 is a renaming of most packages under the `@emotion` organization.

It can be automated by using an ESLint plugin provided by Emotion: refer to the [migration guide](https://emotion.sh/docs/emotion-11#package-renaming) for upgrade instructions.

Then, after running the codemod:

- Remove the legacy dependencies and add the new ones:
  ```sh
  # example with yarn
  yarn remove @emotion/core jest-emotion babel-plugin-emotion # remove legacy dependencies
  yarn add @emotion/react # add new dependencies
  yarn add -D @emotion/babel-plugin @emotion/jest # add new dev dependencies
  yarn upgrade @emotion/styled --latest # upgrade existing packages
  ```
- Fix any duplicate imports of `@emotion/react` in cases where multiple modules (e.g. `css` from v10's `@emotion/core` and `ThemeProvider` from v10's `emotion-theming`) are all under `@emotion/react` in v11.

#### Better TypeScript support

Emotion's TypeScript types have been improved in v11. Refer to the [migration guide](https://emotion.sh/docs/emotion-11#typescript) for details of the changes.

##### Typing the theme

One of the most useful changes is support for typing the theme.

Previously, many apps would use `CreateStyled`:

```ts
// utils/styled.ts
import styled, { CreateStyled } from '@emotion/styled';
import { Theme } from '@sumup/design-tokens';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default styled as CreateStyled<Theme>;
```

...and import the custom `styled` in their components:

```tsx
// components/RedCard.tsx
import { css } from '@emotion/core';

import styled from 'util/styled';

const RedCard = styled(Card)(
  ({ theme }) => css`
    background-color: red;
  `,
);
```

Now, you can type the theme by adding it to `@emotion/react`'s declaration:

```ts
// types/emotion.d.ts (don't forget to include this file in tsconfig.json under `typeRoots`)
import { Theme as CircuitTheme } from '@sumup/design-tokens';
import {} from '@emotion/react/types/css-prop'; // See https://github.com/emotion-js/emotion/pull/1941

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CircuitTheme {}
}
```

...and use `styled` from `@emotion/styled` directly:

```tsx
// components/RedCard.tsx
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const RedCard = styled(Card)(
  ({ theme }) => css`
    background-color: red;
  `,
);
```

#### Compatibility with Storybook

In case you're using [Storybook](https://storybook.js.org/) in your application, you'll need to tweak the Storybook Webpack config to make it compatible with Emotion 11 (Storybook is still on Emotion 10).

Make sure that references to Emotion packages inside Storybook are pointing to the v11 packages:

```js
// .storybook/main.js

const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  webpackFinal: async (config) => {
    // Add compatibility with Emotion 11
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };
    return config;
  },
};
```

### New brand icons

Circuit v4 ships with the [new brand icons](https://circuit.sumup.com/?path=/story/features-icons--page) from `@sumup/icons` v2.

#### Overview of `@sumup/icons` v2

- There used to be "filled" and "empty" versions of some of the v1 icons. The distinction has been removed and all icons are now using a "filled" design. The icon versions were primarily used in the legacy `Sidebar` component, which is being replaced by the new `SideNavgation`.
- The icons' size names changed from `small` and `large` to `16` and `24` (their size in pixels).
- The default icon size was `small` in v1 but is now `24` in v2 (this change follows [Circuit v3's new component heights](#component-heights)).
- Many icons were renamed.
- Some icons or icon sizes were removed.

#### Migrating to `@sumup/icons` v2

Most of the changes can be automated using the 🤖 _component-names-v3_ codemod.

The codemod will print warnings and errors to your console when a manual migration is required:

- Some icons were renamed to match the names of SumUp products. They should not be used outside of the product's context. If you have doubts about your use of the icon, [file an issue](https://github.com/sumup-oss/circuit-ui/issues) or contact the Design System team.
- If an icon you were using was removed in v2 and can't be replaced by another icon, [file an issue](https://github.com/sumup-oss/circuit-ui/issues) or contact the Design System team.
- If you were using a `small` (16px) icon that is only available in v2 in `24` (24px), see if the 24px size works for your use case. If it doesn't, [file an issue](https://github.com/sumup-oss/circuit-ui/issues) or contact the Design System team.

Finally, remember to visually verify your application after the upgrade!

## From v2.x to v3

Circuit v3 is a large major release, including long-awaited changes from the full year that passed since v2. This guide will help you upgrade your application. Don't hesitate to contact the [maintainers](https://github.com/sumup-oss/circuit-ui#maintainers) if you have any further questions.

### Dependencies

Start by upgrading `@sumup/circuit-ui` and its peer dependencies:

```sh
yarn upgrade @sumup/circuit-ui @sumup/design-tokens @sumup/icons --latest
```

### Accessibility

Any accessible label props that were previously optional are now required and enforced in all components.

To help identify places where accessible labels are missing, components throw runtime errors in development at missing labels. Production and testing builds are not affected.

During the migration and while the missing labels are still being added, you can use an escape hatch to continue running the app in development without throwing accessibility errors.

In your app, expose the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable. You can use the [Webpack `DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) ([here's an example](https://github.com/sumup-oss/circuit-ui/blob/main/.storybook/main.js#L45-L53) in the Circuit UI Storybook config) or, if your app uses Next.js, you can declare the variable in your `next.config.js` ([Next.js documentation](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)).

Now, if you want to turn off the accessibility errors temporarily, run the development app with the environment variable set to `true`:

```sh
UNSAFE_DISABLE_ACCESSIBILITY_ERRORS=true yarn dev # or yarn start
```

Keep in mind that this escape hatch is not meant as a way to permanently avoid the errors, but as a temporary workaround while the missing labels are being written, localized and added to the relevant components.

> Reminder: For the `Input` and `Select` components, use the built-in `label` prop instead of using the `Label` component separately.

Other accessibility improvements include:

- Accessible modals and popovers: see the [New modal and popover APIs](#new-modal-and-popover-apis).
- Semantic heading elements: see [Typography: Heading `as` props](#heading-as-props).

### New JSX transform

Circuit v3 improves compatibility with the [new JSX transforms](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) (introduced in React v17).

We recommend the following Babel config for applications on Next.js and Emotion 10 (Emotion 11 is not yet supported by Circuit UI). It also includes support for Emotion's [`css` prop](https://emotion.sh/docs/css-prop).

```json
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/core"
        }
      }
    ]
  ],
  "plugins": [["babel-plugin-emotion", { "cssPropOptimization": true }]]
}
```

### Typography

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

> ⚠️ These changes also apply to the `Anchor` component, which extends `Body`.

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

> ⚠️ The `Body` size changes also apply to the `Anchor` and `List` components.

Most of these changes can be automated using the 🤖 _typography-sizes_ codemod.

The codemod will also warn about occurrences of `<Heading size="zetta">` and `<Text size="giga">`. These should be manually migrated to `size="one"` if possible, or alternatively to custom size styles (recommendation from design: 2.625rem for the `Headline` and 1.125rem for the `Body`).

##### Typography sizes mixins

The deprecated `text[Kilo|Mega|Giga]` style mixins were replaced by a single `typography` mixin, and the deprecated `heading[Kilo|Mega|Giga|Tera|Peta|Exa|Zetta]` and `subHeading[Kilo|Mega]` style mixins were removed.

> Generally, avoid using typography style mixins. Instead, use typography components directly.

#### Heading `as` props

The `as` prop is now required in both the **Headline** and the **SubHeadline** components. Intentionally setting the heading level ensures a consistent and accessible page structure. The `as` prop values were also restricted to HTML heading elements to ensure that heading components render semantic heading elements.

| Component     | Allowed `as` prop values           |
| ------------- | ---------------------------------- |
| `Headline`    | `h1`, `h2`, `h3`, `h4`, `h5`, `h6` |
| `SubHeadline` | `h2`, `h3`, `h4`, `h5`, `h6`       |

> Note that the `Headline` and `SubHeadline` will still fall back to `h2` and `h3`, respectively, but omitting the `as` prop will start throwing errors in the next major version.

#### Typography design tokens

The typography size values in `@sumup/design-tokens` were also updated to reflect the changes in `@sumup/circuit-ui`.

There is no codemod for these changes, migrate manually through search and replace (e.g. `typography.text.mega` 👉 `typography.body.one`). Refer to the tables in [Typography component names](#typography-component-names) and [Typography components `size` prop](#typography-components-size-prop) for the correct mappings.

> Generally, avoid using typography size tokens. Instead, use typography components directly.

### New modal and popover APIs

The `Modal` and `Popover` components were refactored to consolidate their APIs and to improve their accessibility.

#### Modal

The `Modal`, `ModalWrapper`, `ModalHeader`, `ModalFooter`, `ModalContext`, and `ModalConsumer` components are no longer exported. Instead, use the `useModal` hook to render modals instead.

Modals in Circuit v3 are accessible by default, have a streamlined UI and behavior (dimensions, click outside, etc.) and handle edge cases like modal and popover stacking.

Refer to [the Modal stories](https://circuit.sumup.com/?path=/story/components-modal--base) for usage examples.

> ⚠️ You might notice browser UI obscuring parts of your application on mobile viewports. Your application needs to ensure its content stays within CSS safe areas using [CSS `env`](<https://developer.mozilla.org/en-US/docs/Web/CSS/env()>). See [Getting started](https://circuit.sumup.com/?path=/docs/introduction-getting-started--page) for help with configuring the viewport.

#### Popover

The `Popover` component was rebuilt in Circuit v3. It now uses [Popper v2](https://popper.js.org/) under the hood and comes with a refreshed component API.

More importantly, the Circuit v3 Popover is opinionated when it comes to its usage pattern. It no longer accepts custom children, unlike v2, but rather a list of actions (links and/or buttons).

To migrate, separate the popovers in your application into two types.

Start by migrating any popover resembling a dropdown menu to the new Circuit v3 Popover. Refer to [the Popover story](https://circuit.sumup.com/?path=/story/components-popover--base) for a usage example.

Most of the remaining popovers with custom children should gradually be migrated to use different UI patterns (for example modals). In the meantime, we recommend creating a local copy of the Circuit v3 Popover in your application that accepts custom children instead of an array of actions. You'll find [an example](https://github.com/sumup/ze-dashboard/blob/master/src/components/Popover/Popover.tsx) in the SumUp merchant dashboard (private repository).

### Component heights

The heights of all form components were aligned for consistency. The new size values are:

| Size name | Value |                 Usage                 |
| --------- | :---: | :-----------------------------------: |
| `giga`    | 48px  |       Default for web + mobile        |
| `kilo`    | 32px  |     Dense layout for web + mobile     |
| `byte`    | 24px  | Extreme dense layout for web + mobile |

Here's an overview of how the component heights have changed:

| Component                     | Old default height | New default height |
| ----------------------------- | :----------------: | :----------------: |
| Button and derived components |        40px        |        48px        |
| Input and derived components  |        40px        |        48px        |
| Select                        |        40px        |        48px        |
| Tabs                          |        80px        |        48px        |
| Tag                           |        34px        |        32px        |

We recommend verifying these changes visually at the end of the migration.

In addition to its increased height, the `Button`'s default size was renamed from `mega` to `giga` to align it with the new size values (see the table above). (_🤖 \_button-default-size_)

### Other changes

- The **NotificationBanner** component has been renamed to **NotificationCard**. (🤖 _component-names-v3_)
- Label prop names across components were harmonized to follow the _<description>Label_ pattern. (🤖 _label-prop-names_)
  - **CardHeader**: `labelCloseButton` 👉 `closeButtonLabel`
  - **Hamburger**: `labelActive` 👉 `activeLabel`, `labelInActive` 👉 `inactiveLabel`
  - **Tag**: `labelRemoveButton` 👉 `removeButtonLabel`
  - **Toggle**: `labelChecked` 👉 `checkedLabel`, `labelUnchecked` 👉 `uncheckedLabel`
- The **TableRow**, **TableHeader** and **TableCell** components are no longer exported. Use the **Table** component instead.
- The **Table**'s custom `onSortBy` method signature has been changed. The `nextDirection` argument moved to the third position (`(index, nextDirection, rows)` 👉 `(index, rows, nextDirection)`) and is now optional (i.e. it can be `undefined` instead of `null` in the previous implementation).
- The **SelectorGroup**'s `label` is now visible by default, pass `hideLabel` to hide it visually. Its children are now rendered horizontally by default.
- Default `data-testids` are no longer built into the **Table** and **CardHeader** components. We recommend [querying by role](https://testing-library.com/docs/queries/about/#priority) in tests instead to imitate how users interact with our applications.

### Cleaning up

Finally, Circuit v3 removes previously deprecated and/or unused features and props. These breaking changes may not affect your application if you've already addressed the deprecation warnings in Circuit v2 minors, but we still recommend going through the list of changes below.

- The deprecated **Spacing** component has been removed. Use the **spacing** style mixin instead.
- The **ProgressBar**'s deprecated `children` prop has been removed. Use the `label` prop instead.
- The **Card**'s deprecated `shadow` prop has been removed. Shadows have been replaced by a single outline in an earlier minor version.
- The deprecated `styleHelpers` aggregate is no longer exported. Import each style mixin directly instead.
- The `themePropType` is no longer exported from `@sumup/circuit-ui`. Import it from `@sumup/design-tokens` instead.
- The deprecated **withComponents** HOC has been removed. Use the **useComponents** hook instead.
- The **Badge**'s deprecated `onClick` prop has been removed. Badges are not meant to be interactive and should only communicate the status of an element. Use the Tag component for interactive elements instead.
- The **Badge**'s deprecated `primary` variant has been removed. Use the `neutral` variant instead.
- The experimental static styles extraction feature has been removed.

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
