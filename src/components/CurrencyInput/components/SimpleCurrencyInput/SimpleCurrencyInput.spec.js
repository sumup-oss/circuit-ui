import React from 'react';

import SimpleCurrencyInput from '.';
import Label from '../../../Label';
import { CURRENCY_SYMBOLS } from '../../../../util/currency';

describe('SimpleCurrencyInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = render(
      <SimpleCurrencyInput symbol={CURRENCY_SYMBOLS.EUR} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with warning styles', () => {
    const actual = render(
      <SimpleCurrencyInput symbol={CURRENCY_SYMBOLS.EUR} hasWarning />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with error styles', () => {
    const actual = render(
      <SimpleCurrencyInput symbol={CURRENCY_SYMBOLS.EUR} invalid />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over error styles', () => {
    const actual = render(<SimpleCurrencyInput invalid disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize disabled over warning styles', () => {
    const actual = render(<SimpleCurrencyInput invalid hasWarning />);
    expect(actual).toMatchSnapshot();
  });

  it('should adjust input padding and postfix width to match currency symbol width', () => {
    const actual = render(
      <SimpleCurrencyInput placeholder="123,45" symbol={CURRENCY_SYMBOLS.CHF} />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should support rendering symbols on the left', () => {
    const actual = render(
      <SimpleCurrencyInput
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
        <SimpleCurrencyInput id="id" symbol={CURRENCY_SYMBOLS.USD} />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
