import React from 'react';

import Label from '.';

describe('Label', () => {
  it('should have the correct styles', () => {
    const actual = create(<Label htmlFor="some-id">Label</Label>);
    expect(actual).toMatchSnapshot();
  });
});
