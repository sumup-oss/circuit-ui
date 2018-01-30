import React from 'react';

import ButtonGroup from '.';

describe('ButtonGroup', () => {
  it('should have the correct styles', () => {
    const actual = create(<ButtonGroup />);
    expect(actual).toMatchSnapshot();
  });
});
