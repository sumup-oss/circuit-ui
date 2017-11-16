import React from 'react';
import renderer from 'react-test-renderer';
import Price from '.';

describe('Price', () => {
  it('should render a regular price by default.', () => {
    const price = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={9.99} />
    );
    expect(price).toMatchSnapshot();
  });
  it('should prepend the currency symbol when necessary.', () => {
    const prependedSymbolPrice = renderer.create(
      <Price currency="USD" locale="en-US" amount={9.99} />
    );
    expect(prependedSymbolPrice).toMatchSnapshot();
  });
  it('should render installments when they are > 1.', () => {
    const installmentsPrice = renderer.create(
      <Price currency="EUR" locale="de-DE" installments={9} amount={9.99} />
    );
    expect(installmentsPrice).toMatchSnapshot();
  });
  it('should render an asterisk when hasDisclaimer is truthy.', () => {
    const disclaimerPrice = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={9.99} hasDisclaimer={true} />
    );
    expect(disclaimerPrice).toMatchSnapshot();
  });
  it("should not show the fractional part if it's zero.", () => {
    const integerPrice = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={99} />
    );
    expect(integerPrice).toMatchSnapshot();
  });
});
