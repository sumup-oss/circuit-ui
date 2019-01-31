import React from 'react';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  it('should render and match the snapshot', () => {
    const actual = mount(<Sidebar />);
    expect(actual).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Sidebar />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
