# Installation

```
npm install
npm start
```

# Deployment

```
npm run deploy
```

# Linting and formatting

```
npm run fix:prettier
npm run fix:estlint
npm run fix:stylelint

npm run fix # Run all autofixing
```

# Testing

```
npm run test:unit:watch
```

```javascript
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Button from '.';

describe('Button', () => {
  it('should not render if there is no click handler, label, or children', () => {
    const button = renderer.create(<Button />);
    expect(button).toMatchSnapshot();
  });
  it('should take the body text as a child', () => {
    const output = mount(<Button onClick={() => {}}>Hello World</Button>);
    expect(output.text()).toContain('Hello World');
  });
});

```

# Utils

Besides the component library, we also export some utilities which you
might need in order to use the components. Two main ones:

- `withStyles` - a higher order component that handles injecting styles,
  either server-side or client-side.
- `StyleProvider` - a component you'll use to wrap your root component,
  and you'll also signal to `insertCss` on the client-side and
  collect as a string on the server.
- `numbers` - a module for dealing with number localization.
- `currency` - a module for formatting currency amounts.
