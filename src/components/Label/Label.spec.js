import React from 'react';

import Label from '.';

describe('Label', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Label htmlFor="some-id">Label</Label>);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Label />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
