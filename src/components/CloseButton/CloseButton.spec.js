import React from 'react';

import CloseButton from '.';

describe('CloseButton', () => {
  it('should have the correct styles', () => {
    const actual = create(<CloseButton />);
    expect(actual).toMatchSnapshot();
  });
});
