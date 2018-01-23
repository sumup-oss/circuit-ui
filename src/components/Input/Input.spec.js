import React from 'react';

import { Input } from '.';

describe('Input', () => {
  it('should have the correct default styles', () => {
    const actual = create(<Input />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with invalid styles when passed the isInvalid prop', () => {
    const actual = create(<Input isInvalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with optional styles when passed the isOptional prop', () => {
    const actual = create(<Input isOptional />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with disabled styled when passed the disabled prop', () => {
    const actual = create(<Input disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize error over optional styles', () => {
    const actual = create(<Input isInvalid disabled />);
    expect(actual).toMatchSnapshot();
  });
});
