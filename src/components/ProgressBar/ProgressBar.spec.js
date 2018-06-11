import React from 'react';

import ProgressBar from '.';

describe('ProgressBar', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ProgressBar />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with progress styles', () => {
    const actual = create(<ProgressBar value={0.5} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ProgressBar />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
