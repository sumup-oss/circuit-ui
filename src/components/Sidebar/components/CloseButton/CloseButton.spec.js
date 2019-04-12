import React from 'react';

import CloseButton from './CloseButton';

describe('CloseButton', () => {
  describe('styles', () => {
    it('should render and match snapshot when not visible', () => {
      const actual = create(<CloseButton />);
      expect(actual).toMatchSnapshot();
    });

    it('should render and match snapshot when visible', () => {
      const actual = create(<CloseButton visible />);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<CloseButton />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
