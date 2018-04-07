import React from 'react';

import CreditCardDetails from '.';

describe('CreditCardDetails', () => {
  /**
   * Style tests.
   */
  it.skip('should render with default styles', () => {
    const actual = create(<CreditCardDetails />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it.skip('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CreditCardDetails />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
