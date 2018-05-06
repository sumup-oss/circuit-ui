import React from 'react';

import AutoCompleteTags from '.';

describe('AutoCompleteTags', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<AutoCompleteTags availableTags={[]} />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */

  /*
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<AutoCompleteTags availableTags={[]} />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
  */
});
