import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { GROUPS } from '../../../../../.storybook/hierarchySeparators';

import withTests from '../../../../util/withTests';
import SimpleCurrencyInput from './SimpleCurrencyInput';
import { CURRENCY_SYMBOLS } from '../../../../util/currency';

const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalLimit: 2,
  decimalSymbol: '.'
});

storiesOf(`${GROUPS.FORMS}|CurrencyInput/SimpleCurrencyInput`, module)
  .addDecorator(withTests('SimpleCurrencyInput'))
  .add(
    'Default SimpleCurrencyInput',
    withInfo()(() => (
      <SimpleCurrencyInput
        placeholder="123.45"
        symbol={CURRENCY_SYMBOLS.EUR}
        numberMask={numberMask}
      />
    ))
  )
  .add(
    'SimpleCurrencyInput for USD',
    withInfo()(() => (
      <SimpleCurrencyInput
        symbol={CURRENCY_SYMBOLS.USD}
        placeholder="1,234.45"
        numberMask={numberMask}
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
        numberMask={numberMask}
        prependSymbol={false}
      />
    ))
  );
