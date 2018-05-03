import React from 'react';

import Row from '.';

describe('Row', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Row />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Row />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
