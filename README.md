# 🚧 Under construction 🚧

The Circuit UI component API is not yet stable. There will be breaking changes without
corresponding version number updates until we adopt a stable release cycle and versioning
system.

## Installation

```
yarn && yarn start
```

## Deployment

```
yarn deploy
```

## Linting and formatting

```
yarn fix:prettier
yarn fix:estlint
yarn fix:stylelint

yarn fix # Run all autofixing
```

## Testing

```
yarn test:unit:watch
```

```javascript
import React from 'react';
import Button from '.';

describe('Button', () => {
  it('should not render if there is no click handler, label, or children', () => {
    const button = create(<Button />);
    expect(button).toMatchSnapshot();
  });
  it('should take the body text as a child', () => {
    const output = mount(<Button onClick={() => {}}>Hello World</Button>);
    expect(output.text()).toContain('Hello World');
  });
});
```

## Utils

Besides the component library, we also export some utilities which you
might need in order to use the components. Two main ones:

* `numbers` - a module for dealing with number localization.
* `currency` - a module for formatting currency amounts.
* `style-helpers` - a module containing helpers for writing styles.

## Creating components

The project has a binary `bin/create-component` that you can execute from the
project root, passing in the name of your new component.

```
./bin/create-component MyComponent
```

This will

* copy the component template files from `templates/component` to `src/components/MyComponent`,
* rename all files to `MyComponent{.spec|.story}.js`, and
* replace all occurrences of `Component` inside MyComponent's files with `MyComponent`.
