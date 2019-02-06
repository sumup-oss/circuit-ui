import React from 'react';

import Backdrop from './Backdrop';

describe('Backdrop', () => {
  describe('styles', () => {
    it('should render with default styles when not visible', () => {
      const actual = create(<Backdrop visible={false} />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with default styles when visible', () => {
      const actual = create(<Backdrop visible={true} />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Backdrop />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
