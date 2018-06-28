import React from 'react';

import List from '.';

describe('List', () => {
  /**
   * Style tests.
   */
  it('should render a default unordered List', () => {
    const list = create(
      <List>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a kilo unordered List', () => {
    const list = create(
      <List size={List.KILO}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a mega unordered List', () => {
    const list = create(
      <List size={List.MEGA}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render a giga unordered List', () => {
    const list = create(
      <List size={List.GIGA}>
        <li>Hi there</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render nested unordered lists', () => {
    const list = create(
      <List>
        <li>Hi there</li>
        <List>
          <li>Hi there</li>
        </List>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render an ordered list', () => {
    const list = create(
      <List ordered>
        <li>Hi</li>
        <li>It is me</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });

  it('should render with no margin styles when passed the noMargin prop', () => {
    const actual = create(
      <List noMargin>
        <li>Hi</li>
      </List>
    );
    expect(actual).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(
      <List>
        <li>Hi there</li>
      </List>
    );
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
