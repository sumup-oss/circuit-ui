import React from 'react';

import Col from '.';

describe('Col', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Col />);
    expect(actual).toMatchSnapshot();
  });

  describe('default breakpoint', () => {
    it('should render with span based styles', () => {
      const actual = create(<Col span="6" />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with span/skip based styles', () => {
      const actual = create(<Col span="6" skip="6" />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('mobile breakpoint', () => {
    it('should render with span based styles', () => {
      const actual = create(<Col span={{ default: 6, kilo: 12 }} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with span/skip based styles', () => {
      const actual = create(
        <Col span={{ default: 6, kilo: 12 }} skip={{ default: 6, kilo: 3 }} />
      );
      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Col />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
