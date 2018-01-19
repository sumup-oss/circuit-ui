import React from 'react';
import { flow } from 'lodash/fp';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withInfo } from '@storybook/addon-info';

import withTests from '../src/util/withTests';
import { PlainBodyText as BodyText } from '../src/components/BodyText';
import README from '../src/components/BodyText/README.md';

storiesOf('BodyText', module)
  .addDecorator(withTests('BodyText'))
  .add(
    'BodyTexts',
    flow(withNotes(README), withInfo())(() => [
      <BodyText key="pkilo" element="p" size="giga">
        This is a giga BodyText with a p element
      </BodyText>,
      <BodyText key="articlemega" element="article" size="mega">
        This is an mega BodyText with an article element
      </BodyText>,
      <BodyText key="divkilo" element="div" size="kilo">
        This is a kilo BodyText with a div element
      </BodyText>
    ])
  );
