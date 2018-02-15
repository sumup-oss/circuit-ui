import React from 'react';

import SvgButton from '.';

describe('SvgButton', () => {
  /**
   * Style tests.
   */
  it('should render with the default styles', () => {
    const actual = create(
      <SvgButton>
        <div>SVG here</div>
      </SvgButton>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <SvgButton>
        <div>SVG here</div>
      </SvgButton>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
