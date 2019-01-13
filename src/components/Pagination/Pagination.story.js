import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { number, text } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import Pagination from '.';

storiesOf(`${GROUPS.COMPONENTS}|Pagination`, module)
  .addDecorator(withTests('Pagination'))
  .add(
    'Pagination',
    withInfo()(() => (
      <Pagination
        page={number('page', 1)}
        perPage={number('perPage', 10)}
        total={number('total', 50)}
        pagesToShow={number('pagesToShow', 1)}
        onChange={() => {}}
        footer={text('footer', 'Showing 1 - 10 of 50 items')}
      />
    ))
  );
