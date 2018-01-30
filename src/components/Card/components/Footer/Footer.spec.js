import React from 'react';

import { CardFooter } from '../../';

describe('CardFooter', () => {
  it('should have the correct styles', () => {
    const actual = create(<CardFooter />);
    expect(actual).toMatchSnapshot();
  });
});
