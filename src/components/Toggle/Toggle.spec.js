import React from 'react';

import Toggle from '.';

describe('Toggle', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Toggle />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(<Toggle noMargin />);
    expect(actual).toMatchSnapshot(actual);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Toggle />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
