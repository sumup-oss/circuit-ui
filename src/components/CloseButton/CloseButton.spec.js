import React from 'react';

import CloseButton from '.';

describe('CloseButton', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CloseButton />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CloseButton />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
