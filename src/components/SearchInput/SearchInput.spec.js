import React from 'react';

import SearchInput from '.';

describe('SearchInput', () => {
  it('should render with default styles', () => {
    const actual = create(<SearchInput selector="search" />);
    expect(actual).toMatchSnapshot();
  });

  it('should grey out icon when disabled', () => {
    const actual = create(<SearchInput selector="search" disabled />);
    expect(actual).toMatchSnapshot();
  });
});
