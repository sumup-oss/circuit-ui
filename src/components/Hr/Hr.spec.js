import React from 'react';

import Hr from './Hr';

describe('Hr', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Hr />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Hr />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
