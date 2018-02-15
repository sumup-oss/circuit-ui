import React from 'react';

import { MessageIcon } from '../..';

describe('MessageIcon', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<MessageIcon />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<MessageIcon />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
