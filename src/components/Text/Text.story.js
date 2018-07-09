import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean } from '@storybook/addon-knobs';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Text from '.';

const elements = ['p', 'article', 'div', 'span', 'strong', 'em'];
const sizes = [Text.KILO, Text.MEGA, Text.GIGA];

// eslint-disable-next-line max-len
const content = `An electronic circuit is composed of individual electronic components, such as resistors, transistors, capacitors, inductors and diodes, connected by conductive wires or traces through which electric current can flow.`;

storiesOf(`${GROUPS.TYPOGRAPHY}|Text`, module)
  .addDecorator(withTests('Text'))
  .add(
    'Text',
    withInfo()(() => (
      <div style={{ width: '66%', margin: '0 auto' }}>
        <Text
          element={select('Element', elements, elements[0])}
          size={select('Size', sizes, sizes[0])}
          noMargin={boolean('No margin')}
          bold={boolean('Bold')}
          italic={boolean('Italic')}
        >
          {content}
        </Text>
      </div>
    ))
  );
