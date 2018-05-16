import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { boolean, text, select } from '@storybook/addon-knobs/react';

import withTests from '../../../../util/withTests';
import TableCell from '.';

const options = {
  [TableCell.LEFT]: TableCell.LEFT,
  [TableCell.RIGHT]: TableCell.RIGHT,
  [TableCell.CENTER]: TableCell.CENTER
};

storiesOf('TableCell', module)
  .addDecorator(withTests('TableCell'))
  .add(
    'Table Cell',
    withInfo()(() => (
      <TableCell
        style={{ width: '300px', alignSelf: 'center' }}
        align={select('Align', options)}
        isHovered={boolean('Hover styles', false)}
      >
        {text('Content', 'Header')}
      </TableCell>
    ))
  );
