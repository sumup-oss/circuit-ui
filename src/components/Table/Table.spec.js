import React from 'react';

import Table from '.';

describe('Table', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Table />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Table />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
