import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../../../util/withTests';
import SimpleCurrencyInput from './SimpleCurrencyInput';
import { CURRENCY_SYMBOLS } from '../../../../util/currency';

storiesOf('SimpleCurrencyInput', module)
  .addDecorator(withTests('SimpleCurrencyInput'))
  .add(
    'Default SimpleCurrencyInput',
    withInfo()(() => (
      <SimpleCurrencyInput placeholder="123.45" symbol={CURRENCY_SYMBOLS.EUR} />
    ))
  )
  .add(
    'SimpleCurrencyInput for USD',
    withInfo()(() => (
      <SimpleCurrencyInput
        symbol={CURRENCY_SYMBOLS.USD}
        placeholder="1,234.45"
        prependSymbol
      />
    ))
  )
  .add(
    'SimpleCurrencyInput for right aligned CHF',
    withInfo()(() => (
      <SimpleCurrencyInput
        symbol={CURRENCY_SYMBOLS.CHF}
        placeholder="1,234.45"
        prependSymbol={false}
      />
    ))
  );
