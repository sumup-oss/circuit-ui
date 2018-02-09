import React from 'react';

import Input from '.';

describe('Input', () => {
  it('should render with default styles', () => {
    const actual = create(<Input />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with invalid styles when passed the invalid prop', () => {
    const actual = create(<Input invalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with optional styles when passed the optional prop', () => {
    const actual = create(<Input optional />);
    expect(actual).toMatchSnapshot();
  });

  it('should render with disabled styled when passed the disabled prop', () => {
    const actual = create(<Input disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize error over optional styles', () => {
    const actual = create(<Input invalid disabled />);
    expect(actual).toMatchSnapshot();
  });
});
