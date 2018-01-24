import React from 'react';

import { InputWrapper } from '.';

describe('InputWrapper', () => {
  it("should have it's base styles", () => {
    const actual = create(<InputWrapper />);
    expect(actual).toMatchSnapshot();
  });
});
