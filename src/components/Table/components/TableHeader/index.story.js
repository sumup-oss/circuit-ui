import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, text, select } from '@storybook/addon-knobs/react';

import withTests from '../../../../util/withTests';
import TableHeader from '.';

const options = {
  [TableHeader.LEFT]: TableHeader.LEFT,
  [TableHeader.RIGHT]: TableHeader.RIGHT,
  [TableHeader.CENTER]: TableHeader.CENTER
};

storiesOf('TableHeader', module)
  .addDecorator(withTests('TableHeader'))
  .add(
    'Table Header',
    withInfo()(() => (
      <TableHeader
        style={{ width: '300px', alignSelf: 'center' }}
        align={select('Align', options)}
        sortable={boolean('Sortable', false)}
      >
        {text('Content', 'Header')}
      </TableHeader>
    ))
  );
