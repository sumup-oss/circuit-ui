import React from 'react';

import Message from '.';

describe('Message', () => {
  it('should render with default styles', () => {
    const actual = create(<Message />);
    expect(actual).toMatchSnapshot();
  });
});
