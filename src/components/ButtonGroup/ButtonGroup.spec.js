import React from 'react';

import ButtonGroup from '.';

describe('ButtonGroup', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<ButtonGroup />);
    expect(actual).toMatchSnapshot();
  });

  describe('Center aligment', () => {
    it('should render with center alignment styles', () => {
      const actual = create(<ButtonGroup align={ButtonGroup.CENTER} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('Left aligment', () => {
    it('should render with left alignment styles', () => {
      const actual = create(<ButtonGroup align={ButtonGroup.LEFT} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('No margin bottom', () => {
    it('should render without margin bottom styles', () => {
      const actual = create(<ButtonGroup noMargin />);
      expect(actual).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<ButtonGroup />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
