import React from 'react';

import Card from '.';

describe('Card', () => {
  it('should render with the correct styles', () => {
    const actual = create(<Card />);
    expect(actual).toMatchSnapshot();
  });
});
