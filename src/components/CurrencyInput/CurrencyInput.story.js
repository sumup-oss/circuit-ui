import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import CurrencyInput from '.';

storiesOf('CurrencyInput', module)
  .addDecorator(withTests('CurrencyInput'))
  .add(
    'Default CurrencyInput',
    withInfo()(() => <CurrencyInput placeholder="123.45" />)
  )
  .add(
    'Invalid CurrencyInput',
    withInfo()(() => <CurrencyInput placeholder="123.45" invalid />)
  )
  .add(
    'Optional CurrencyInput',
    withInfo()(() => <CurrencyInput placeholder="123.45" optional />)
  )
  .add(
    'Disabled CurrencyInput',
    withInfo()(() => <CurrencyInput placeholder="123.45" disabled />)
  )
  .add(
    'BGN CurrencyInput',
    withInfo()(() => <CurrencyInput placeholder="123,45" currency="лв." />)
  )
  .add(
    'USD CurrencyInput',
    withInfo()(() => (
      <CurrencyInput
        currency="$"
        placeholder="123.45"
        currencyPosition="left"
        textAlign="left"
      />
    ))
  );
