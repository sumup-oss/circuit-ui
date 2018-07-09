import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, boolean, text } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Heading from '.';

const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const sizes = [
  Heading.ZETTA,
  Heading.EXA,
  Heading.PETA,
  Heading.TERA,
  Heading.GIGA,
  Heading.MEGA,
  Heading.KILO
];

storiesOf(`${GROUPS.TYPOGRAPHY}|Heading`, module)
  .addDecorator(withTests('Heading'))
  .add(
    'Heading',
    withInfo()(() => (
      <Heading
        element={select('Element', elements, elements[0])}
        size={select('Size', sizes, sizes[0])}
        noMargin={boolean('No margin', false)}
      >
        {text('Text', 'This is a heading')}
      </Heading>
    ))
  );
