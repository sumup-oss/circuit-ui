import React from 'react';

import { SearchInput } from '.';

describe('SearchInput', () => {
  it('should render with default styles', () => {
    const actual = create(<SearchInput />);
    expect(actual).toMatchSnapshot();
  });
});
