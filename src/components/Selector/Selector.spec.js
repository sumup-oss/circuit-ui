import React from 'react';

import Selector from '.';

describe('Selector', () => {
  it('should render a default selector appropriately', () => {
    const component = <Selector />;
    expect(component).toMatchSnapshot();
  });
  it('should render a disabled selector appropriately', () => {
    const component = <Selector disabled />;
    expect(component).toMatchSnapshot();
  });
  it('should render a selected selector appropriately', () => {
    const component = <Selector selected />;
    expect(component).toMatchSnapshot();
  });
});
