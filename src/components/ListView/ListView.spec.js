import React from 'react';

import ListView from '.';

const BaseList = () => (
  <ListView>
    <ListView.Item>List item 1</ListView.Item>
    <ListView.Item selected>List item 2</ListView.Item>
    <ListView.Item>List item 3</ListView.Item>
    <ListView.Item>List item 4</ListView.Item>
  </ListView>
);

describe('ListView', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<BaseList />);
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<BaseList />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
