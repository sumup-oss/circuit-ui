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
    'USD CurrencyInput',
    withInfo()(() => (
      <CurrencyInput
        currency="$"
        placeholder="1,234.45"
        currencyPosition="left"
        textAlign="left"
      />
    ))
  )
  .add(
    'BGN CurrencyInput',
    withInfo()(() => <CurrencyInput currency="лв." placeholder="1 234,56" />)
  )
  .add(
    'CLP CurrencyInput',
    withInfo()(() => (
      <CurrencyInput
        currency="$"
        placeholder="1.234"
        currencyPosition="left"
        textAlign="left"
      />
    ))
  );
