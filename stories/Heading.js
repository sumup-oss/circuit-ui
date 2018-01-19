import React from 'react';
import { flow } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

import withTests from '../src/util/withTests';
import { PlainHeading as Heading } from '../src/components/Heading';
import README from '../src/components/Heading/README.md';

storiesOf('Headings', module)
  .addDecorator(withTests('Heading'))
  .add(
    'Heading',
    flow(withNotes(README), withInfo())(() => [
      <Heading key="h1zetta" element="h1" size="zetta">
        This is a zetta heading with an h1 element
      </Heading>,
      <Heading key="h2exa" element="h2" size="exa">
        This is an exa heading with an h2 element
      </Heading>,
      <Heading key="h3peta" element="h3" size="peta">
        This is a peta heading with an h3 element
      </Heading>,
      <Heading key="h4tera" element="h4" size="tera">
        This is a tera heading with an h4 element
      </Heading>,
      <Heading key="h5giga" element="h5" size="giga">
        This is a giga heading with an h5 element
      </Heading>,
      <Heading key="h6mega" element="h6" size="mega">
        This is a mega heading with an h6 element
      </Heading>,
      <Heading key="h6kilo" element="h6" size="kilo">
        This is a kilo heading with an h6 element
      </Heading>
    ])
  );
