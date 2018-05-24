import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { GROUPS } from '../../../.storybook/hierarchySeparators';

import withTests from '../../util/withTests';
import CurrencyInput from './CurrencyInput';

storiesOf(`${GROUPS.FORMS}|CurrencyInput`, module)
  .addDecorator(withTests('CurrencyInput'))
  .add(
    'Default CurrencyInput',
    withInfo()(() => (
      <CurrencyInput placeholder="123.45" locale="de-DE" currency="USD" />
    ))
  );
