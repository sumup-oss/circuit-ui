import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean, text } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import SubHeading from '.';

const elements = ['h2', 'h3', 'h4', 'h5', 'h6'];
const sizes = [SubHeading.MEGA, SubHeading.KILO];

storiesOf(`${GROUPS.TYPOGRAPHY}|SubHeading`, module)
  .addDecorator(withTests('SubHeading'))
  .add(
    'SubHeading',
    withInfo()(() => (
      <SubHeading
        element={select('Element', elements, elements[0])}
        size={select('Size', sizes, sizes[0])}
        noMargin={boolean('No margin', false)}
      >
        {text('Text', 'This is a subheading')}
      </SubHeading>
    ))
  );
