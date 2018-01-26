import React from 'react';

import SearchInput from '.';

describe('SearchInput', () => {
  it('should render with default styles', () => {
    const actual = create(<SearchInput selector="search" />);
    expect(actual).toMatchSnapshot();
  });

  it('should render icon with 0.4 opacity when disabled', () => {
    const actual = create(<SearchInput selector="search" disabled />);
    expect(actual).toMatchSnapshot();
  });
});
