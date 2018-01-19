import React from 'react';
import { flow } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

import withTests from '../src/util/withTests';
import { PlainSubHeading as SubHeading } from '../src/components/SubHeading';
import README from '../src/components/SubHeading/README.md';

storiesOf('SubHeadings', module)
  .addDecorator(withTests('SubHeading'))
  .add(
    'SubHeading',
    flow(withNotes(README), withInfo())(() => [
      <SubHeading key="h2kilo" element="h2" size="kilo">
        This is an kilo SubHeading with an h2 element
      </SubHeading>,
      <SubHeading key="h3mega" element="h3" size="mega">
        This is a mega SubHeading with an h3 element
      </SubHeading>
    ])
  );
