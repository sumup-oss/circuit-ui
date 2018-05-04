import React from 'react';

import Grid from '.';

describe('Grid', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Grid />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Grid />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
