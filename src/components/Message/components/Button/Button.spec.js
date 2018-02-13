import React from 'react';

import { MessageButton } from '../../';

describe('MessageButton', () => {
  it('should render with default styles', () => {
    const actual = create(<MessageButton />);
    expect(actual).toMatchSnapshot();
  });
  it('should render alignment styles when passed the align prop', () => {
    const actual = create(<MessageButton align={MessageButton.CENTER} />);
    expect(actual).toMatchSnapshot();
  });
});
