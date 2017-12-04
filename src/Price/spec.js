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

  it('should render the symbol with the fractional amount for amounts with fractional part.', () => {
    const price = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={9.99} />
    );
    expect(price).toMatchSnapshot();
  });

  it('should render the symbol with the integer part for amounts without fractional part.', () => {
    const price = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={9} />
    );
    expect(price).toMatchSnapshot();
  });

  it('should render installments when they are > 1.', () => {
    const installmentsPrice = renderer.create(
      <Price currency="EUR" locale="de-DE" installments={9} amount={9.99} />
    );
    expect(installmentsPrice).toMatchSnapshot();
  });

  it('should render a prepended currency symbol under the installments.', () => {
    const installmentsPrice = renderer.create(
      <Price currency="BRL" locale="pt-BR" installments={12} amount={9.99} />
    );
    expect(installmentsPrice).toMatchSnapshot();
  });

  it("should not show the fractional part if it's zero.", () => {
    const integerPrice = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={99} />
    );
    expect(integerPrice).toMatchSnapshot();
  });

  const SUPPORTED_COLORS = ['highlight', 'warning', 'error'];
  SUPPORTED_COLORS.forEach(color => {
    it(`should render with the ${color} color.`, () => {
      const price = renderer.create(
        <Price currency="EUR" locale="de-DE" amount={99} color={color} />
      );
      expect(price).toMatchSnapshot();
    });
  });

  it(`should fall back to brand color when an invalid color prop is passed.`, () => {
    const invalidColor = 'foobar';
    const price = renderer.create(
      <Price currency="EUR" locale="de-DE" amount={99} color={invalidColor} />
    );
    expect(price).toMatchSnapshot();
  });
});
