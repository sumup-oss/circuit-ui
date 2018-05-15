import React from 'react';

import ModalFooter from '.';

describe('ModalFooter', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ModalFooter />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ModalFooter />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
