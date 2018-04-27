import React from 'react';

import MaskedInput from '.';

describe('MaskedInput', () => {
  /**
   * Style tests.
   */
  it.skip('should render with default styles', () => {
    const actual = create(<MaskedInput />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it.skip('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<MaskedInput />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
