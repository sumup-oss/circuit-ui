import React from 'react';

import CurrencyInput from '.';
import Label from '../Label';

describe('CurrencyInput', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CurrencyInput />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<CurrencyInput invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with optional styles when passed the optional prop', () => {
    const actual = create(<CurrencyInput optional />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styles when passed the disabled prop', () => {
    const actual = create(<CurrencyInput disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with BGN currency styles', () => {
    const actual = create(
      <CurrencyInput placeholder="123,45" currency="лв." />
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with USD currency styles', () => {
    const actual = create(
      <CurrencyInput
        currency="$"
        placeholder="123.45"
        currencyPosition="left"
        textAlign="left"
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
        <CurrencyInput id="id" />
      </Label>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
