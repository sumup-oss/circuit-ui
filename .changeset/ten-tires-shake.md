---
"@sumup-oss/circuit-ui": major
---

Dropped support for React 18. React 19 is now the minimum required version.

**Migration guide**

Upgrade `react` and `react-dom` to v19:

```sh
npm install react@^19 react-dom@^19
```

**Breaking changes**

- `react` and `react-dom` peer dependencies now require `>=19.0.0`
- All components previously wrapped in `React.forwardRef` now accept `ref` as a regular prop. This is the recommended React 19 pattern and is transparent to most consumers. Passing `forwardRef`-wrapped components as props (e.g. `leadingComponent` in `ListItem`) continues to work
- `Toggle`: the `onChange` prop is now typed as `MouseEventHandler<HTMLButtonElement>` instead of the inherited `ChangeEventHandler<HTMLButtonElement>`. Consumers who extend `ToggleProps` may need to update their type annotations
- `Popover`: the wrapping `<div>` around the trigger element has been removed from the DOM. `PopoverReferenceProps` now includes an internal `ref` callback that Popover uses to locate the trigger element for Floating UI positioning. Consumers whose `component` spreads `{...props}` onto a native element are unaffected. Consumers using a custom component that does not spread props need to forward the ref to the root DOM element
- `ActionMenu`: the inner `<div role="menu">` wrapper has been removed; `role="menu"` and `aria-labelledby` now live on Popover's content element directly. Accessibility semantics are unchanged
