import React from 'react';

import { FormLabel } from '.';

describe('FormLabel', () => {
  it('should have the correct styles', () => {
    const actual = create(<FormLabel>Label</FormLabel>);
    expect(actual).toMatchSnapshot();
  });
});
