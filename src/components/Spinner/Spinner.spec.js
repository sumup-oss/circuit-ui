import React from 'react';

import Spinner from './Spinner';

describe('Spinner', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Spinner />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with dark styles', () => {
    const actual = create(<Spinner dark />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Spinner />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
