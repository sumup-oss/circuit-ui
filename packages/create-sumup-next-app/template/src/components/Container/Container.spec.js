import React from 'react';

import Container from '.';

describe('Container', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Container />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Container />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
