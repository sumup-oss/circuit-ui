import React from 'react';

import ModalWrapper from '.';

describe('ModalWrapper', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ModalWrapper />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ModalWrapper />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
