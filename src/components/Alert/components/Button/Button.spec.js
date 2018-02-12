import React from 'react';

import { AlertButton } from '../../';

describe('AlertButton', () => {
  it('should have the correct styles', () => {
    const actual = create(<AlertButton />);
    expect(actual).toMatchSnapshot();
  });
});
