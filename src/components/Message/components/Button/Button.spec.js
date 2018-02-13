import React from 'react';

import { MessageButton } from '../../';

describe('MessageButton', () => {
  it('should have the correct styles', () => {
    const actual = create(<MessageButton />);
    expect(actual).toMatchSnapshot();
  });
});
