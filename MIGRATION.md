# Migration <!-- omit in toc -->

- [🤖 Automated migration](#-automated-migration)
- [From v6.x to v7](#from-v6x-to-v7)
  - [Prerequisites](#prerequisites)
  - [ES Modules](#es-modules)
  - [CSS Modules](#css-modules)
    - [Global styles](#global-styles)
    - [Custom component styles](#custom-component-styles)
    - [Design tokens](#design-tokens)
    - [Utility classes](#utility-classes)
  - [Component lifecycle](#component-lifecycle)
  - [Removed @sumup/collector](#removed-sumupcollector)
  - [Other changes](#other-changes)
- [From v6.x to v6.3](#from-v6x-to-v63)
  - [New semantic color tokens](#new-semantic-color-tokens)
  - [Visual component changes](#visual-component-changes)
  - [Other changes](#other-changes-1)
- [From v5.x to v6](#from-v5x-to-v6)
  - [No default component margins](#no-default-component-margins)
  - [Form component consistency](#form-component-consistency)
    - [Markup changes](#markup-changes)
    - [The `Label` component was removed](#the-label-component-was-removed)
    - [The `inline` prop was removed](#the-inline-prop-was-removed)
    - [The `labelStyles` prop was removed](#the-labelstyles-prop-was-removed)
    - [The `label` prop only accepts a string](#the-label-prop-only-accepts-a-string)
    - [Improved `validationHint` for the `Checkbox` component](#improved-validationhint-for-the-checkbox-component)
    - [Minor fixes](#minor-fixes)
  - [Other changes](#other-changes-2)
- [🤖 Codemods](#-codemods-jscodeshift)
- [From v4.x to v5](#from-v4x-to-v5)
  - [Explicit browser support](#explicit-browser-support)
  - [New semantic color names](#new-semantic-color-names)
    - [...in design tokens](#in-design-tokens)
    - [...in component variants](#in-component-variants)
  - [New notification components](#new-notification-components)
  - [Required accessible labels](#required-accessible-labels)
  - [Runtime errors for missing `noMargin` props](#runtime-errors-for-missing-nomargin-props)
  - [The `ListItemGroup` replaces the `CardList`](#the-listitemgroup-replaces-the-cardlist)
  - [Combined `LoadingButton` and `Button`](#combined-loadingbutton-and-button)
  - [Other changes](#other-changes-3)
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
  - [Other changes](#other-changes-4)
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

## 🤖 Automated migration

Some of the changes in this guide can be automated using [`@sumup/eslint-plugin-circuit-ui`](https://circuit.sumup.com/?path=/docs/packages-eslint-plugin-circuit-ui--docs). Changes that can be automated are marked with a robot emoji (🤖) and the name of the ESLint rule (e.g. _no-deprecated-props_)

We encourage you to enable and apply the rules incrementally and review the changes before continuing. The rules don't cover all edge cases, so further manual changes might be necessary. For example, the ESLint rules only analyze one file at a time, so if a Circuit UI component is wrapped in a styled component in one file and used in another, ESLint won't be able to update its props.

Prior to v5, codemods were implemented using [jscodeshift](#-codemods-jscodeshift).

## From v6.x to v7

Circuit UI v7 contains two foundational changes — the [switch to ES Modules](#es-modules) and [the replacement of Emotion.js with CSS Modules](#css-modules) — and a number of smaller changes to improve consistency and accessibility. New [component lifecycle stages](#component-lifecycle) lower the barrier for contributions. The [Next.js template](https://circuit.sumup.com/?path=/docs/packages-cna-template--docs) has been upgraded to Circuit UI v7 and a [new Remix template](https://circuit.sumup.com/?path=/docs/packages-remix-template--docs) has been added.

To get started, upgrade `@sumup/circuit-ui` and its peer dependencies:

```sh
npm upgrade @sumup/circuit-ui @sumup/design-tokens @sumup/icons
```

Upgrade any linter plugins your app is using:

```sh
# ESLint
npm upgrade @sumup/eslint-plugin-circuit-ui
# Stylelint
npm upgrade @sumup/stylelint-plugin-circuit-ui
```

For a complete list of changes, refer to the [changelog](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md).

### Prerequisites

Circuit UI now relies on APIs introduced in [React 18](https://react.dev/blog/2022/03/29/react-v18). Upgrade the `react` and `react-dom` peer dependencies to >=18.

Circuit UI now requires at minimum Node.js v18. Note that Node 16 is [scheduled](https://nodejs.dev/en/about/releases/) to reach its end-of-life in September 2023.

Circuit UI no longer supports a range of older browsers:

| Browser          | Previous | New   |
| ---------------- | -------- | ----- |
| Chrome           | 63+      | 73+   |
| Firefox          | 67+      | 67+   |
| Edge             | 79+      | 79+   |
| Safari iOS       | 11.0+    | 12.2+ |
| Safari macOS     | 11.1+    | 12.1+ |
| Opera            | 50+      | 60+   |
| Samsung Internet | 8.2+     | 11.1+ |

### ES Modules

As of ES6 (ES2015), JavaScript supports a native module format called ES Modules, or ECMAScript Modules. This modern module format replaces the non-standard CommonJS.

`@sumup/circuit-ui` and `@sumup/icons` are now pure ESM. Please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

- If you use TypeScript, you need to use TypeScript 4.7 or later ([ref](https://github.com/microsoft/TypeScript/issues/46452)).
- If you use a bundler, make sure it supports ESM and that you have correctly configured it for ESM. (Next.js supports ESM packages out of the box since [v12](https://nextjs.org/blog/next-12#es-modules-support-and-url-imports)).
- The `"exports"` field is now used to configure the package entry points. Files that are not explicitly defined in `"exports"` can no longer be imported.

### CSS Modules

[Emotion.js](https://emotion.sh/), the CSS-in-JS library that Circuit UI had used until now to style components, has been replaced with [CSS Modules](https://github.com/css-modules/css-modules). This will significantly improve the performance of SumUp’s web applications, future-proof the component library against ecosystem changes and start to decouple it from React. Read more about the reasoning in the [RFC](https://github.com/sumup-oss/circuit-ui/issues/2153).

#### Global styles

Remove the [`BaseStyles`](https://circuit.sumup.com/?path=/docs/introduction-getting-started--docs#configuring-the-theme) component and import the CSS files containing the light theme and component styles instead:

```diff
// _app.tsx
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
-import { BaseStyles } from '@sumup/circuit-ui';
+import '@sumup/design-tokens/light.css';
+import '@sumup/circuit-ui/styles.css';

function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={light}>
-			<BaseStyles />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
```

The application code must be processed by a bundler that can handle CSS files. [Next.js](https://nextjs.org/docs/pages/building-your-application/styling), [Create React App](https://create-react-app.dev/docs/adding-a-stylesheet), [Remix](https://remix.run/docs/en/main/guides/styling#regular-stylesheets), [Vite](https://vitejs.dev/guide/features.html#css-modules), [Parcel](https://parceljs.org/languages/css/#css-modules) and others support importing CSS files out of the box.

If you are only importing [stable](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) components and aren't using Emotion.js in your app, you can remove all Emotion.js-related dependencies.

#### Custom component styles

You can continue to pass the `className` and `styles` props to Circuit UI components. If your application uses Emotion.js, you can continue to use the `css` prop since it is transpiled to the `className` prop by Emotion.js’ Babel plugin.

#### Design tokens

The design tokens have been ported to [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (aka CSS variables) similar to the existing semantic color tokens:

```diff
-${theme.borderRadius.circle}
+var(--cui-border-radius.circle)
```

The JavaScript `theme` object from `@sumup/design-tokens` has been deprecated. Use the 🤖 [`prefer-custom-properties`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/prefer-custom-properties) ESLint rule to flag and automatically rewrite uses of the JS theme to CSS custom properties. Note that the `mq`, `breakpoints`, and `grid` theme properties haven't been migrated to CSS custom properties and are considered legacy.

#### Utility classes

Circuit UI exports [style mixins](https://circuit.sumup.com/?path=/docs/features-style-mixins--docs) such as `spacing`, `hideVisually`, or `shadow`. These functions return an Emotion.js style object that can be passed to the `css` prop but not the `className` prop. The legacy style mixins will be kept for backward compatibility.

For applications that don’t use Emotion.js, Circuit UI exports a new, smaller collection of string utility classes that can be passed to the `className` prop and conditionally joined using the new `clsx` helper.

<details>
  <summary>Example</summary>

```tsx
import { clsx, utilClasses } from '@sumup/circuit-ui';

function Component() {
  return <div className={clsx(utilClasses.center, utilClasses.hideVisually)} />;
}
```

</details>

### Component lifecycle

Circuit UI v7 introduces the concept of lifecycle stages for components. Within each stage, components meet different requirements and receive different levels of support. Experimental and legacy components are exported separately from stable components. Use the 🤖 [`component-lifecycle-imports`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/component-lifecycle-imports) ESLint rule to flag components that have moved to a different stage and automatically update their imports.

The following components have been moved to the legacy stage:

- Layout components: Grid, Row, Col, and InlineElements
- Calendar components: CalendarTag, CalendarTagTwoStep, RangePicker, RangePickerController, SingleDayPicker, and CalendarConstants
- Legacy navigation components: Header, Sidebar, SidebarContextProvider, and SidebarContextConsumer
- Tooltip component
- Style mixins: `cx`, `center`, `clearfix`, `disableVisually`, `focusOutline`, `focusVisible`, `hideScrollbar`, `hideVisually`, `inputOutline`, `shadow`, `spacing`, and `typography`
- The `uniqueId` utility function

### Removed @sumup/collector

[`@sumup/collector`](https://github.com/sumup-oss/collector) has been deprecated and the integration with Circuit UI has been removed. Replace the `tracking` prop with event handlers to dispatch user interaction events instead (🤖 [`no-deprecated-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-props)).

```diff
import { Button } from '@sumup/circuit-ui';
+import { useClickTrigger } from '@sumup/collector';

function Component() {
+  const dispatch = useClickTrigger();
+
+  const handleClick = () => {
+    dispatch({
+      component: 'button',
+      label: 'track-button',
+      customParameters: { key: 'value' },
+    });
+    // ...other logic
+  }

  return (
    <Button
+      onClick={handleClick}
-      tracking={{
-        label: 'track-button',
-        customParameters: { key: 'value' },
-      }}
    >
      Buy now
    </Button>
  );
}
```

### Other changes

- Removed the public export of the RadioButton component. Use the RadioButtonGroup component instead (🤖 [`no-deprecated-components`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-components))
- Removed the public export of the Selector component. Use the SelectorGroup component instead (🤖 [`no-deprecated-components`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-deprecated-components))
- Removed the deprecated `children` property from the SelectorGroup's `options` prop. Use the `label` and `description` properties instead.
- Removed the deprecated `children` prop from the Checkbox component. Use the `label` prop instead.
- Removed the deprecated `explanation` prop from the Toggle component. Use the `description` prop instead (🤖 [`no-renamed-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-renamed-props))
- Removed the deprecated `confirm`, `notify`, and `alert` variants from the Badge, NotificationInline, and NotificationToast components. Use the `success`, `warning`, and `danger` variants instead (🤖 [`no-renamed-props`](https://github.com/sumup-oss/circuit-ui/tree/main/packages/eslint-plugin-circuit-ui/no-renamed-props))
- Changed the signature of the ImageInput's `component` prop. The component should now accept `aria-hidden` instead of `alt`.
- Migrated the Calendar components to TypeScript. Some props are now required. The CalendarTagTwoStep's `clearText` and `confirmText` props have been renamed to `clearButtonLabel` and `confirmButtonLabel` respectively.
- Migrated the Carousel components to TypeScript. Added the required `playButtonLabel`, `pauseButtonLabel`, `prevButtonLabel`, and `nextButtonLabel` props.
- Migrated the Tabs and Sidebar components to TypeScript.
- Simplified the function signature of the style mixins that no longer require the theme parameter (`shadow`, `focusOutline`, `focusVisible`, and `inputOutline`).
- Removed the `sharedPropTypes` export. Type the props using TypeScript instead.

## From v6.x to v6.3

Although not a major version, Circuit UI v6.3 comes with a few important visual changes related to color that we wanted to mention here for visibility.

To get started, upgrade `@sumup/circuit-ui` and `@sumup/design-tokens`:

```sh
yarn upgrade @sumup/circuit-ui @sumup/design-tokens --latest
```

### New semantic color tokens

In [v6.1](https://github.com/sumup-oss/circuit-ui/releases/tag/%40sumup%2Fcircuit-ui%406.1.0), we released new semantic color tokens, which are meant to replace the existing color tokens from `@sumup/design-tokens` to enable use cases like theming, as well as more robust customizations. The new tokens were declared as CSS custom properties in the Circuit UI `BaseStyles`.

Starting in [v6.3](https://github.com/sumup-oss/circuit-ui/releases/tag/%40sumup%2Fcircuit-ui%406.3.0), all Circuit UI components (except the legacy `Sidebar` component) use these semantic color tokens under the hood. Legacy color tokens from `@sumup/design-tokens` have been deprecated and will be removed in a future major version.

### Visual component changes

A number of components were adjusted to the new color system. Most notably:

- The `Avatar` component's default placeholder (visible when no `src` is passed) was changed to match the new colors and to use SVG icons from `@sumup/icons`.
- All form components `validationHint`s, in their warning state, are now orange instead of gray.
- Warning icons are now orange on white, instead of yellow with a black exclamation mark `!`.
- The warning color changed from yellow (2.01:1 contrast ratio) to orange (3.01:1 contrast ratio).
- The `Button` component's disabled state styles were visually aligned with iOS and Android styles. Contrast is now effectively lower.

### Other changes

- We've received a report that the upgrade surfaced a [long-standing JSDOM bug](https://github.com/jsdom/jsdom/issues/3232) where a `<fieldset>` element is considered `:disabled` if it contains a `<legend>`. This might cause issues with unit tests that use `user-event`, since it will throw when trying to interact with a `:disabled` element. This is seemingly unrelated to Circuit UI, but if you run into the issue, you can work around it by turning off `user-event`'s `pointerEventsCheck`: `userEvent.click(element, { pointerEventsCheck: 0 }`.

## From v5.x to v6

Circuit UI v6 contains two major changes: the [removal of default component margins](#no-default-component-margins), and [changes to form components](#form-component-consistency) to improve consistency and accessibility.

To get started, upgrade `@sumup/circuit-ui` and its peer dependencies:

```sh
yarn upgrade @sumup/circuit-ui @sumup/design-tokens @sumup/icons --latest
```

> For a complete list of changes, refer to the [changelog](https://github.com/sumup-oss/circuit-ui/blob/main/packages/circuit-ui/CHANGELOG.md).

> :warning: Note: this major version doesn't include codemods. The changes cannot easily be automated and should be migrated manually. Detailed migration steps for each change are listed below.

### No default component margins

Default component margins have been deprecated since v2, and the use of the `noMargin` prop was encouraged to ensure that UIs don't rely on the default margin. Omitting the prop [throws errors since v5](#runtime-errors-for-missing-nomargin-props).

In v6, default margins have been completely removed from components. The `noMargin` prop, now redundant, has been removed as well.

If you've already addressed all the errors thrown in v5, migration is straightforward: now that the `noMargin` prop isn't necessary anymore, you can simply remove it from your codebase. If you haven't, make sure to address them before migrating to v6. Failure to do so can result in unintended UI bugs.

Removing the prop from your codebase is easiest done using search and replace in your IDE.

### Form component consistency

In v6, form components follow a more consistent and accessible pattern.

#### Markup changes

Markup was adapted to improve consistency and accessibility across form components.

- Form components are now all wrapped in a `div` that receives any styles passed through the `style` or `className` attributes, including via the Emotion.js `css` prop. This might break custom styles.
- Form `<label>`s don't wrap inputs anymore. This might break styles previously passed to `labelStyles` (see also [The `labelStyles` prop was removed](#the-labelstyles-prop-was-removed)).
- An empty [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) is now rendered below form components. If a `validationHint` is passed along with either the `invalid`, `hasWarning` or `showValid` props (indicating status messages), the message will be rendered inside the live region to be announced by screen readers.
- The `validationHint` is now programmatically associated to a form control via `aria-describedby`. A unique `id` for it is generated internally. If a custom `id` is passed to a component with `aria-describedby`, the descriptions will be combined.

Verify your forms visually. Look out for form components with custom styles and adapt them as needed.

#### The `Label` component was removed

In most cases, the `Label` component shouldn't be used: form components have a built-in `label` prop that ensures that controls are appropriately and accessibly labelled.

In implementations where the `Label` doesn't label a form component, use a `<Body size="two" />` instead.

Where the `Label` describes the purpose of a form component, use the built-in `label` prop instead. In edge cases and custom form component implementations, replace the `Label` by a `<label css={typography("two")} />`.

#### The `inline` prop was removed

The prop was removed from the `Input`, `TextArea` and `Select` components.

It went again the principles of atomic design and was rarely used in implementations.

Replace it with a custom CSS wrapper, for example using `display: flex;`.

Alternatively, to recreate the exact same functionality, pass `display: inline-block;` and a margin to the components:

```tsx
const inlineStyles = (theme) => css`
  display: inline-block;
  margin-right: ${theme.spacings.mega};
`;

function Address() {
  return (
    <>
      <Input label="Postcode" css={inlineStyles} />
      <Input label="City" css={inlineStyles} />
    </>
  );
}
```

#### The `labelStyles` prop was removed

The prop was removed from the `Input` and `TextArea` components.

In v5, `labelStyles` is predominantly used to apply styles to a form component's wrapper, the `label` element. Wrapper styles can't be passed via the `style` or `className` prop, because these are forwarded to the underlying form element.

In v6, form components are wrapped in a `div` that receives any `style` or `className` props, including via the Emotion.js `css` prop.

Therefore, to migrate:

- `labelStyles` should be replaced by the Emotion.js `css` prop
- `css` (previously passed to the underlying form element) should be replaced by `inputStyles`

For example:

```diff
<Input
  label="Name"
  /* wrapper styles */
-  labelStyles={spacing({ bottom: "giga" })}
+  css={spacing({ bottom: "giga" })}
  /* input styles */
-  css={customInputStyles}
+  inputStyles={customInputStyles}
/>
```

Note that if you were using the `labelStyles` in non-standard ways (for example using selectors such as `> div` to style component internals), you may need to refactor your implementation.

#### The `label` prop only accepts a string

In v5, some form components (such as the `Input`) accepted any `ReactNode` as a label.

This can be an accessibility issue, because the `label` prop value is exposed to assistive technology as the control's [accessible name](https://www.tpgi.com/what-is-an-accessible-name/). Accessible names don't have semantics or structure, so rendering e.g. an anchor or a tooltip in the `label` is bad practice.

In v6, the `label` prop only accepts a `string`. The change is TypeScript-only (i.e. a `ReactNode` would still be rendered) but migration is encouraged.

We've observed two common patterns affected by this change:

If a `label` is used to render an optional label, it can be replaced with the `optionalLabel` prop:

```diff
- const optionalStyles = (theme) => css`
-   color: ${theme.colors.n700};
- `;

<Input
- label={<>Address line 2 <span css={optionalStyles}>(Optional)</span></>}
+ label="Address line 2"
+ optionalLabel="Optional"
/>;
```

If a `label` is used to render a tooltip next to the label, replace the tooltip with a `validationHint`.

If you need time to migrate, you can temporarily ignore the change (with `@ts-expect-error` if using TypeScript). Bear in mind that passing a `ReactNode` may stop working in a future minor.

#### Improved `validationHint` for the `Checkbox` component

In v5, a `validationHint` passed to the `Checkbox` component (either as a description or as a status message) would render in a tooltip.

This caused accessibility and UI issues (with the tooltip overlapping other controls) and wasn't consistent with other form components.

In v6, a `validationHint` is rendered below the `Checkbox`.

#### Minor fixes

This version also includes a number of accessibility and visual fixes. While these aren't technically breaking changes, you may notice them in snapshots, so they are listed here for your convenience:

- the `RadioButtonGroup`'s role was changed from the implicit `group` (from the `fieldset` element) to the explicit `radiogroup`. It also has `orientation="vertical"`
- the chevron icon in the `Select` element was hidden from assistive technology using `aria-hidden`
- invalid radio buttons are now programmatically marked as invalid using `aria-invalid`
- the `CurrencyInput`'s currency code/symbol is now exposed to assistive technology as part of the input's description
- the font size of any text rendered in an `Input`'s prefix or suffix was increased from 14px to 16px to match designs. This also affects the `CurrencyInput`'s currency code/symbol.
- unintended spacing was removed from below the `TextArea` using `vertical-align: top;`

### Other changes

- `react-number-format` was upgraded to v5. This could be a breaking change if you were relying on internal `react-number-format` props. Refer to the `react-number-format` [migration guide](https://s-yadav.github.io/react-number-format/docs/migration/) for details. Any explicit typings will also need to be updated.
- The `ButtonGroup` component now switches between a secondary button (on viewports of at least `mq.kilo`) and a tertiary button (on viewports narrower than `mq.kilo`) using CSS media queries, instead of rendering three buttons and conditionally hiding one. Tests (e.g. using `@testing-library`) should now query the secondary button without using `*AllBy` queries. Snapshots might also be affected.
- Typography design tokens now use the `rem` unit. Ensure that your global styles do not override the root font-size. See [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/).
- The `Popover` component was migrated from Popper (deprecated) to Floating UI. If your app uses Popper directly, we recommend migrating to Floating UI to avoid duplicating dependencies. See [Migrating from Popper 2 to Floating UI](https://floating-ui.com/docs/migration#__next)
- Circuit UI's browser support policy was updated. The library now supports browsers with support for [dynamic module imports](https://caniuse.com/es6-module-dynamic-import). See the [Browser Support](https://circuit.sumup.com/?path=/docs/introduction-browser-support--docs) documentation for details.
- If your app uses TypeScript, an upgrade of the `@types/react` package in Circuit UI may clash with the version installed in your app. If your app is on React 18, upgrade `@types/react` to `^18.0.25` to fix the issue. If your app is on React 17, upgrade `@types/react` to `^17.0.52` and [extend the React namespace](https://github.com/sumup-oss/circuit-ui/pull/1831#issuecomment-1307485956). More details on [the DefinitelyTyped PR that introduced the issue](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/63076).

## 🤖 Codemods (jscodeshift)

Some of the changes up to v5 can be automated with _codemods_, small scripts that modify your app's source code automatically. Changes that can be codemodded are marked with a robot emoji (🤖) and the name of the transform (e.g. _button-variant-enum_). The codemods are built with [jscodeshift](https://github.com/facebook/jscodeshift) and can be run through the CLI that ships with Circuit UI. Here is an overview of all available options (you can view this help menu by running `yarn circuit-ui migrate --help`):

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

You can only run one codemod at a time and we encourage you to apply the transforms incrementally and review the changes before continuing. The codemods don't cover all edge cases, so further manual changes might be necessary. For example, `jscodeshift` is only able to look at one file at a time, so if a Circuit UI component is wrapped in a styled component in one file and used in another, the codemod won't be able to update its props.

Tip: Provide the `--transform`/`-t` argument at the end of the command, so that as you run further codemods you can easily replace the last argument and reuse the command to run the next codemod.

> ⚠️ If you run into `'node\r': No such file or directory` when running the codemods with yarn, run them with Node directly instead (this is a [known issue](https://github.com/facebook/jscodeshift/issues/424)).
>
> ```sh
> ./node_modules/.bin/circuit-ui migrate -l JavaScript -l TypeScript -t codemod-name
> ```

## From v4.x to v5

Circuit UI v5 is a maintenance release, primarily removing deprecated components and props.

> :warning: In order to make the migration from v4 to v5 easier, we recommend that you address the changes listed below _before_ upgrading the Circuit UI dependencies. Deprecation warnings can also help identify code that needs to be migrated.

### Explicit browser support

Starting in v5, Circuit UI is explicit about which browsers it supports. Refer to the [browser support documentation](https://circuit.sumup.com/?path=/docs/contributing-browser-support--docs) for details.

Here's what you need to be mindful of when migrating:

- You no longer need to transpile Circuit UI when bundling your application (using e.g. [`next-transpile-module`](https://github.com/martpie/next-transpile-modules) in Next.js). Circuit UI now supports all target browsers out-of-the-box.
- Previously recommended polyfills for Internet Explorer support are no longer necessary, and can be removed from your application:
  - the [polyfill for the `Intl.NumberFormat` API](https://formatjs.io/docs/polyfills/intl-numberformat) isn't necessary anymore.
  - the [`object-fit` polyfill](https://github.com/constancecchen/object-fit-polyfill) (for the Carousel component) isn't necessary anymore.

### New semantic color names

#### ...in design tokens

New semantic color names were introduced in `@sumup/design-tokens@3.4.0`. The legacy names were deprecated and have been removed in v5.

| Legacy name | New name  |
| ----------- | --------- |
| `success`   | `confirm` |
| `warning`   | `notify`  |
| `danger`    | `alert`   |

The new naming brings cross-platform consistency, as well as alignment with some existing components such as the notification icons.

_🤖 semantic-color-names_

#### ...in component variants

Some `Body`, `BodyLarge` and `Badge` component variants were also renamed for consistency with the new design tokens:

| Legacy variant                | New variant                   |
| ----------------------------- | ----------------------------- |
| `<Body variant="success" />`  | `<Body variant="confirm" />`  |
| `<Body variant="error" />`    | `<Body variant="alert" />`    |
| `<Badge variant="success" />` | `<Badge variant="confirm" />` |
| `<Badge variant="warning" />` | `<Badge variant="notify" />`  |
| `<Badge variant="danger" />`  | `<Badge variant="alert" />`   |

_Note: the `Body` variants mapping above also apply to the `BodyLarge` component._

The legacy variant names were deprecated in v4.14.0 and will be removed in v5.

_🤖 semantic-variant-names_

### New notification components

The legacy Circuit UI notification components (`Notification`, `NotificationList`, `NotificationCard` and `InlineMessage`) were general purpose and lacking clear guidelines on when to use which, leading to inconsistent usage in our apps.

They were deprecated in v4.14.0 and replaced by semantic, accessible components that make it clear when each should be used and are flexible enough to cover all use cases (`NotificationBanner`, `NotificationFullscreen`, `NotificationModal`, `NotificationToast` and `NotificationInline`). The legacy components have been removed in v5.

To migrate to the new notifications, you'll need to:

- Replace the `InlineMessage` by the `NotificationInline` in your app
- Replace uses of the `NotificationCard`, `NotificationList` and `Notification` (often used together) by either the `NotificationInline` or `NotificationBanner`, depending on the use cases.

Furthermore, some patterns that were previously not supported by Circuit UI are now available:

- The new `NotificationToast` provider and hook should replace any custom implementation of a toast notifications system for improved accessibility.
- The new `NotificationModal` can be used for building notification dialogs that are essential to user flows.
- The new `NotificationFullscreen` can replace custom full-screen messages such as error pages or empty states, for more consistency across pages.

Read more about the new notification components in [the Notification section in Storybook](https://circuit.sumup.com/?path=/docs/notification).

### Required accessible labels

In [Circuit UI v3](#accessibility), components requiring accessible labels started throwing an error when the labels weren't being passed. This behavior could be worked around for migration purposes by setting the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable.

In v5, the workaround was removed, meaning that all components that require accessible labels expect to receive them.

Before migrating, make sure that you add appropriate and localized labels for all occurrences flagged by the error mechanism. After that, stop setting the `UNSAFE_DISABLE_ACCESSIBILITY_ERRORS` environment variable.

### Runtime errors for missing `noMargin` props

Several components used to have built-in bottom margin by default, and a `noMargin` prop to reset it. This non-atomic behavior was deprecated several major versions ago, but migration has proved difficult.

All components with built-in margin should be passed `noMargin`, so that we can remove the prop using codemods in a future major while avoiding UI regressions.

Instead of removing the `noMargin` prop in v5, components that should receive it now throw a runtime error in development if the prop is missing. Production and testing builds are not affected. The `noMargin` prop was also marked as required in TypeScript types.

While migrating, you can use an escape hatch to continue running your app in development without throwing.

In your app, expose the `UNSAFE_DISABLE_NO_MARGIN_ERRORS` environment variable. You can use the [Webpack `DefinePlugin`](https://webpack.js.org/plugins/define-plugin/) (see the [Circuit UI Storybook Webpack config](https://github.com/sumup-oss/circuit-ui/blob/main/.storybook/main.js) as an example) or, if your app uses Next.js, you can declare the variable in your `next.config.js` ([Next.js documentation](https://nextjs.org/docs/api-reference/next.config.js/environment-variables)).

Once your app is set up to accept the environment variable, set it to `true` in development to prevent components from throwing:

```sh
UNSAFE_DISABLE_NO_MARGIN_ERRORS=true yarn dev # or yarn start
```

Keep in mind that this escape hatch is not meant as a way to permanently bypass the errors, but as a temporary workaround to help migrate without regressions. The `noMargin` prop will be entirely removed in v6.

### The `ListItemGroup` replaces the `CardList`

Two new components, `ListItem` and `ListItemGroup`, were added to Circuit UI v4.4.0 to render lists of contextually similar items.

The `ListItem` component should generally be used implicitly by passing `items` to the `ListItemGroup`. The `ListItemGroup` differs from the `List` component because while the latter applies light styling to an HTML `ul` or `ol`, the former allows for structured data and interactivity. Refer to the [component's documentation](https://circuit.sumup.com/?path=/docs/components-listitem--base) for usage guidelines and examples.

Circuit UI v5 comes with two related breaking changes:

- the legacy `CardList` component has been deprecated in favor of the `ListItemGroup`. The component APIs are very different and migration can unfortunately not be automated: please migrate manually. The new component also comes with different styles: verify the changes visually with a designer.
- (If you were already using the `ListItem` in a Circuit UI v4.x release:) The `ListItem` component's `prefix` and `suffix` props were renamed to `leadingComponent` and `trailingComponent`. The `suffixLabel` and `suffixDetails` props were renamed to `trailingLabel` and `trailingDetails`. The codemod will not transform uses of the `ListItem` as `ListItemGroup` items. (_🤖 listitem-prop-names_)

### Combined `LoadingButton` and `Button`

The `LoadingButton` is an extension of the `Button` component and adds a loading state. This is a common use case, so the loading functionality has been added to the `Button` component itself. The `LoadingButton` was deprecated in v4.1 and was removed in v5.

The API hasn't changed: uses of the `LoadingButton` can be replaced by the `Button` component

🤖 _component-names-v5_

### Other changes

- The deprecated `zIndex.sidebar` design token was removed from `@sumup/design-tokens`. Use `sIndex.navigation` instead. There is no codemod for this change: search and replace the old value for the new one in your codebase.
- The deprecated `shadowSingle`, `shadowDouble` and `shadowTriple` style mixins were removed. Use the `shadow()` style mixin instead. There is no codemod for this change: migrate manually by searching for the deprecated style mixins in your codebase, and verify the changes visually.
- The `RadioButton` component's deprecated `children` prop was removed. Use the `label` prop, now typed as required, instead. There is no codemod for this change: search your codebase for uses of the `RadioButton` or `RadioButtonGroup` component and migrate them manually.
- The `ButtonGroup` component's deprecated `children` prop was removed. Use the `actions` prop instead. If the new `ButtonGroup` component API doesn't fit your use case, consider aligning your use case with the design system, or writing a custom layout wrapper for your buttons.
- The deprecated `showValid` option was removed from the `inputOutline` style mixin.

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

Circuit v4 ships with the [new brand icons](https://circuit.sumup.com/?path=/docs/features-icons--docs) from `@sumup/icons` v2.

#### Overview of `@sumup/icons` v2

- There used to be "filled" and "empty" versions of some of the v1 icons. The distinction has been removed and all icons are now using a "filled" design. The icon versions were primarily used in the legacy `Sidebar` component, which is being replaced by the new `SideNavgation`.
- The icons' size names changed from `small` and `large` to `16` and `24` (their size in pixels).
- The default icon size was `small` in v1 but is now `24` in v2 (this change follows [Circuit v3's new component heights](#component-heights)).
- Many icons were renamed.
- Some icons or icon sizes were removed.

#### Migrating to `@sumup/icons` v2

Most of the changes can be automated using the 🤖 _icons-v2_ codemod.

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

> Note that the codemod will also transform other renamed components (see [Other Changes](#other-changes-4).

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

> ⚠️ You might notice browser UI obscuring parts of your application on mobile viewports. Your application needs to ensure its content stays within CSS safe areas using [CSS `env`](<https://developer.mozilla.org/en-US/docs/Web/CSS/env()>). See [Getting started](https://circuit.sumup.com/?path=/docs/introduction-getting-started--docs) for help with configuring the viewport.

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

In addition to its increased height, the `Button`'s default size was renamed from `mega` to `giga` to align it with the new size values (see the table above). (🤖 _button-default-size_)

### Other changes

- The design tokens **borderRadius** scale was changed. (🤖 _theme-border-radius_)
  | value | v2 name | v3 name |
  | --- | --- | --- |
  | 1px | `kilo` | — (remove the radius or hardcode) |
  | 4px | `mega` | `bit` |
  | 6px | `giga` | — (migrate to `byte`) |
  | 8px | `tera` | `byte` |
  | 12px | `peta` | `kilo` |
  | 16px | — | `mega` (new value) |
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
