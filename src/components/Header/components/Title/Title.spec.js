import React from 'react';

import Title from './Title';

describe('Title', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const actual = create(<Title>Title</Title>);
      expect(actual).toMatchSnapshot();
    });
  });

  it('should render children', () => {
    const wrapper = shallow(
      <Title>
        <span data-selector="child">Title</span>
      </Title>
    );
    const actual = wrapper.find('[data-selector="child"]');

    expect(actual).toHaveLength(1);
    expect(actual.text()).toEqual('Title');
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Title>Title</Title>);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
