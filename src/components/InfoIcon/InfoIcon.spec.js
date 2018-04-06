import React from 'react';

import InfoIcon from '.';

describe('InfoIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<InfoIcon />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<InfoIcon />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
