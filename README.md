# Installation

```
npm install
npm i -g @storybook/cli
npm start
```

# Deployment

```
npm run deploy
```

# Testing

Tests can be written alongside components.

Since components need to be wrapped with a `StyleProvider`, you should
import functionality from `util/enzyme` rather than `enzyme`. For instance:

```javascript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { mount } from '../util/enzyme';
import expect from 'expect';
import { specs, describe, it } from 'storybook-addon-specifications'

/**
 * storiesOf and describe must have the same string
 * to link the tests together.
 */
storiesOf('Buttons', module)
  .add('Button', () => {
    const story = (
      <button className="btn btn--highlight" onClick={action('clicked')}>Hello Button</Button>
    );

    specs(() => describe('Buttons', function () {
      it('Should have the Hello Button label', function () {
        let output = mount(story);
        expect(output.text()).toContain('Hello Button');
      });
    }));

    return story;
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
