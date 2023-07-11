---
'@sumup/circuit-ui': major
---

Migrated all [stable](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) components from [Emotion.js](https://github.com/emotion-js/emotion) to [CSS Modules](https://github.com/css-modules/css-modules).

The styles are bundled and exported as a single CSS file as `@sumup/circuit-ui/styles.css`. Refer to your framework's documentation on how to include the styles globally in your application.

The CSS file includes the base styles, so the BaseStyles component has been removed.

If you are only importing [stable](https://circuit.sumup.com/?path=/docs/introduction-component-lifecycle--docs) components and aren't using Emotion.js in your app, you can remove all Emotion.js-related dependencies.
