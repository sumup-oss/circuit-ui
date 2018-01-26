import React from 'react';

import { IconInputWrapper } from '.';

describe('IconInputWrapper', () => {
  it("should have it's base styles", () => {
    const actual = create(<IconInputWrapper />);
    expect(actual).toMatchSnapshot();
  });
});
