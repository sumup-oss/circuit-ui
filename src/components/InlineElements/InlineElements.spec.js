import React from 'react';

import InlineElements from '.';

describe('InlineElements', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<InlineElements />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with ratio styles', () => {
    const actual = create(
      <InlineElements inlineMobile ratios={[2, 1]}>
        <div />
        <div />
      </InlineElements>
    );
    expect(actual).toMatchSnapshot();
  });

  it('should render with inlineMobile styles', () => {
    const actual = create(<InlineElements inlineMobile />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<InlineElements />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
