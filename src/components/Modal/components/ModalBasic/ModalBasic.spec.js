import React from 'react';

import ModalBasic from '.';

describe('ModalBasic', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ModalBasic />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ModalBasic />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
