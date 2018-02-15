import React from 'react';

import { CardFooter } from '../../';

describe('CardFooter', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<CardFooter />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<CardFooter />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
