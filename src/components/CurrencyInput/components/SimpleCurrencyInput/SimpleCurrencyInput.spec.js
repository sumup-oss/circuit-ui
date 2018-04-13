import React from 'react';

import CurrencyInput from '.';
import Label from '../../../Label';
import { CURRENCY_SYMBOLS } from '../../../../util/currency';

describe('CurrencyInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CurrencyInput symbol={CURRENCY_SYMBOLS.EUR} />);
    expect(actual).toMatchSnapshot();
  });

  it('should adjust input padding and postfix width to match currency symbol width', () => {
    const actual = create(
      <CurrencyInput placeholder="123,45" symbol={CURRENCY_SYMBOLS.CHF} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should support rendering symbols on the left', () => {
    const actual = create(
      <CurrencyInput
        symbol={CURRENCY_SYMBOLS.USD}
        placeholder="123.45"
        prependSymbol
      />
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <Label htmlFor="id">
        Label
        <CurrencyInput id="id" symbol={CURRENCY_SYMBOLS.USD} />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
