import React from 'react';

import { CardHeader } from '../..';

describe('CardHeader', () => {
  it('should have the correct styles', () => {
    const actual = create(<CardHeader />);
    expect(actual).toMatchSnapshot();
  });
});
