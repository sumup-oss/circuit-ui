import React from 'react';

import { TextArea } from '.';

describe('TextArea', () => {
  it('should have the correct default styles', () => {
    const actual = create(<TextArea />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with invalid styles when passed the isInvalid prop', () => {
    const actual = create(<TextArea isInvalid />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with optional styles when passed the isOptional prop', () => {
    const actual = create(<TextArea isOptional />);
    expect(actual).toMatchSnapshot();
  });

  it('should show with disabled styled when passed the disabled prop', () => {
    const actual = create(<TextArea disabled />);
    expect(actual).toMatchSnapshot();
  });

  it('should prioritize error over optional styles', () => {
    const actual = create(<TextArea isInvalid disabled />);
    expect(actual).toMatchSnapshot();
  });
});
