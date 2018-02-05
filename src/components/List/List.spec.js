import React from 'react';

import List from '.';

describe('List', () => {
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
        <li>It's me</li>
      </List>
    );
    expect(list).toMatchSnapshot();
  });
});
