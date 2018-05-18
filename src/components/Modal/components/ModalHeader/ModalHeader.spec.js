import React from 'react';

import ModalHeader from '.';

describe('ModalHeader', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ModalHeader />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ModalHeader />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
